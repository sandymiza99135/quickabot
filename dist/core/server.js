"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_request_method_enum_1 = require("./enums/http-request-method.enum");
const body_parser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('./quickadev1.accesbanque.mg/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./quickadev1.accesbanque.mg/cert.pem', 'utf8');
const ca = fs.readFileSync('./quickadev1.accesbanque.mg/chain.pem', 'utf8');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};
class HttpServer {
    constructor(port) {
        this.port = port;
        this.httpsServer = null;
        this.httpServer = null;
        this.server = null;
        this.routes = null;
        this.corsOptions = {
            origin: 'https://quickadev1.accesbanque.mg/uploadImage?name=test.png',
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        };
        this.routes = new Array();
        this.obsevers = new Array();
    }
    initialize() {
        if (this.server == null)
            this.server = express_1.default();
        this.httpServer = http.createServer(this.server);
        this.httpsServer = https.createServer(credentials, this.server);
        this.server.use(body_parser.json());
        this.server.use(body_parser.urlencoded({ extended: true }));
        this.server.use(cors());
        this.server.use(fileUpload({ createParentPath: true }));
        console.log("fileupload added");
        this.server.engine('html', require('ejs').renderFile);
        this.server.set('view engine', 'html');
        //this.server.set('views', __dirname + '/views');
    }
    beforeExecuteRequest(obsever) {
        this.obsevers.forEach(function () {
            obsever.beforeExecuteRequest(this);
        }.bind(this));
    }
    onSuccess(obsever, res) {
        this.obsevers.forEach(function () {
            obsever.onSucces(this, res);
        }.bind(this));
    }
    onError(obsever, error) {
        this.obsevers.forEach(function () {
            obsever.onError(this, error);
        }.bind(this));
    }
    setHttpRequest(uri, serverRequest, request) {
        request.body = serverRequest.body;
        request.files = serverRequest.files;
        request.queryParams = serverRequest.query;
        request.uri = uri;
        Object.keys(serverRequest.headers).forEach((key) => {
            request.headers.push({ name: key, value: serverRequest.headers[key] });
        });
    }
    prepareAndSendResponse(serverResponse, response) {
        response.headers.forEach((header) => {
            serverResponse.setHeader(header.name, header.value);
        });
        serverResponse.status(response.status);
        if (response.isFile) {
            serverResponse.sendFile(response.filePath);
        }
        else if (response.isHtml) {
            serverResponse.render(response.filePath, response.body);
        }
        else {
            serverResponse.send(response.body);
        }
    }
    registerRoutes() {
        this.routes.forEach(function (route) {
            switch (route.requestMethod) {
                //for GET route action
                case http_request_method_enum_1.HttpRequestMethod.GET:
                    {
                        this.server.get(route.uri, function (serverRequest, serverResponse) {
                            let controllerInstance = null;
                            try {
                                controllerInstance = eval('route.controller()');
                                this.setHttpRequest(route.uri, serverRequest, controllerInstance.request);
                                this.beforeExecuteRequest();
                                eval('controllerInstance.' + route.action + '()');
                                this.onSucces(this, route.controller.response);
                            }
                            catch (error) {
                                this.onError(this, route.controller.response);
                            }
                            this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                            controllerInstance = null;
                        }.bind(this));
                    }
                    break;
                //for POST route action
                case http_request_method_enum_1.HttpRequestMethod.POST:
                    {
                        this.server.post(route.uri, function (serverRequest, serverResponse) {
                            let controllerInstance = null;
                            try {
                                controllerInstance = eval('route.controller()');
                                this.setHttpRequest(route.uri, serverRequest, controllerInstance.request);
                                this.beforeExecuteRequest();
                                eval('controllerInstance.' + route.action + '()');
                                this.onSuccess(this, route.controller.response);
                            }
                            catch (error) {
                                console.log(error);
                                this.onError(this, route.controller.response);
                            }
                            this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                            controllerInstance = null;
                        }.bind(this));
                    }
                    break;
            }
        }.bind(this));
    }
    start() {
        this.initialize();
        this.httpServer.listen((this.port + 1), err => {
            if (err) {
                return console.error(err);
            }
            return console.log(`Http server is listening on ${this.port + 1}`);
        });
        this.httpsServer.listen(this.port, err => {
            if (err) {
                return console.error(err);
            }
            return console.log(`Https server is listening on ${this.port}`);
        });
    }
}
exports.HttpServer = HttpServer;
//# sourceMappingURL=server.js.map