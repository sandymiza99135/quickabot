"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('request');
class FbMiddleware {
    constructor() {
        this.obsevers = new Array();
    }
    getHttpClient() {
        return request;
    }
    subscribeObsever(obsever) {
        if (this.obsevers == null)
            this.obsevers = new Array();
        this.obsevers.push(obsever);
    }
    sendMessage(requestMethod, url, accessToken, body, callback) {
        //console.log(JSON.stringify(body, null, 4));
        this.obsevers.forEach(function (obsever) {
            obsever.beforeExecuteRequest(this);
        }.bind(this));
        request({
            "uri": url,
            "qs": { access_token: accessToken },
            "method": requestMethod,
            "json": body
        }, (err, res, body) => {
            if (!err) {
                this.obsevers.forEach(function (obsever) {
                    obsever.onSucces(this, res);
                }.bind(this));
            }
            else {
                this.obsevers.forEach(function (obsever) {
                    obsever.onError(this, res);
                }.bind(this));
            }
            //console.log(err);
            //console.log(res);
            callback({ statusCode: res.statusCode, body: body });
        });
    }
    getInfo(requestMethod, url, accessToken, fields, body, callback) {
        this.obsevers.forEach(function (obsever) {
            obsever.beforeExecuteRequest(this);
        }.bind(this));
        request({
            "uri": url,
            "qs": {
                fields: fields,
                access_token: accessToken
            },
            "method": requestMethod,
            "json": body
        }, (err, res, body) => {
            if (!err) {
                this.obsevers.forEach(function (obsever) {
                    obsever.onSucces(this, res);
                }.bind(this));
            }
            else {
                this.obsevers.forEach(function (obsever) {
                    obsever.onError(this, res);
                }.bind(this));
            }
            callback({ statusCode: res.statusCode, body: JSON.parse(body) });
        });
    }
}
exports.FbMiddleware = FbMiddleware;
//# sourceMappingURL=fb-middleware.js.map