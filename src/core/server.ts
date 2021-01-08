import express from 'express';
import { Route } from './models/route';
import { HttpRequestMethod } from './enums/http-request-method.enum';
import { RequestObsever } from './interfaces/request-obsever.interface';
import { RouteResolver } from './resolvers/route-resolver';
import { HttpResponseModel } from './models/http-response.model';
import { HttpHeader } from './models/htt-header.model';
import { HttpRequestModel } from './models/http-request.model';
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

export class HttpServer {
    private httpsServer: any = null;
    private httpServer: any = null;
    private server: any = null;
    public routes: Array<Route> = null;
    public obsevers: Array<RequestObsever>;
    constructor(private port: number) {
        this.routes = new Array<Route>();
        this.obsevers = new Array<RequestObsever>();
    }
	
	private corsOptions = {
	  origin: 'https://quickadev1.accesbanque.mg/uploadImage?name=test.png',
	  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
	}

    initialize() {
        if (this.server == null) this.server = express();
        this.httpServer = http.createServer(this.server);
        this.httpsServer = https.createServer(credentials, this.server);
        this.server.use(body_parser.json());
        this.server.use(body_parser.urlencoded({ extended: true }));
		this.server.use(cors());
		this.server.use(fileUpload({createParentPath: true}));
		console.log("fileupload added");
		this.server.engine('html', require('ejs').renderFile);
        this.server.set('view engine', 'html');
		//this.server.set('views', __dirname + '/views');
    }
    private beforeExecuteRequest(obsever: RequestObsever) {
        this.obsevers.forEach(function () {
            obsever.beforeExecuteRequest(this);
        }.bind(this));
    }

    private onSuccess(obsever: RequestObsever, res: any) {
        this.obsevers.forEach(function () {
            obsever.onSucces(this, res);
        }.bind(this));
    }

    private onError(obsever: RequestObsever, error: any) {
        this.obsevers.forEach(function () {
            obsever.onError(this, error);
        }.bind(this));
    }

    private setHttpRequest(uri: string, serverRequest: any, request: HttpRequestModel) {
        request.body = serverRequest.body;
		request.files = serverRequest.files;
        request.queryParams = serverRequest.query;
        request.uri = uri;
        Object.keys(serverRequest.headers).forEach((key) => {
            request.headers.push({ name: key, value: serverRequest.headers[key] } as HttpHeader);
        });

    }

    private prepareAndSendResponse(serverResponse: any, response: HttpResponseModel) {
        response.headers.forEach((header: HttpHeader) => {
            serverResponse.setHeader(header.name, header.value);
        });
        serverResponse.status(response.status);
        if(response.isFile)
        {
            serverResponse.sendFile(response.filePath);
        }else if(response.isHtml){
			serverResponse.render(response.filePath, response.body);
		}else{
            serverResponse.send(response.body);
		}
    }

    registerRoutes() {
        this.routes.forEach(function (route: Route) {
            switch (route.requestMethod) {
                //for GET route action
                case HttpRequestMethod.GET: {
                    this.server.get(route.uri, function (serverRequest, serverResponse) {
                        let controllerInstance = null;
                        try {
                            controllerInstance = eval('route.controller()');
                            this.setHttpRequest(route.uri, serverRequest, controllerInstance.request);
                            this.beforeExecuteRequest();
                            eval('controllerInstance.' + route.action + '()');
                            this.onSucces(this, route.controller.response);
                        } catch (error) {
                            this.onError(this, route.controller.response)
                        }
                        this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                        controllerInstance = null;
                    }.bind(this));
                } break;

                //for POST route action
                case HttpRequestMethod.POST: {
                    this.server.post(route.uri, function (serverRequest, serverResponse) {
						 
                        let controllerInstance = null;
                        try {
                            controllerInstance = eval('route.controller()');
                            this.setHttpRequest(route.uri, serverRequest, controllerInstance.request);
                            this.beforeExecuteRequest();
                            eval('controllerInstance.' + route.action + '()');
                            this.onSuccess(this, route.controller.response);
                        } catch (error) {
							console.log(error);
                            this.onError(this, route.controller.response)
                        }
                        this.prepareAndSendResponse(serverResponse, controllerInstance.response);
                        controllerInstance = null;
                    }.bind(this));
                } break;
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