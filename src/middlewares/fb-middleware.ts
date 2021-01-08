import { FbMessageModel } from "../models/fb/fb-message.model";
import { HttpRequestMethod } from "../core/enums/http-request-method.enum";
import { MiddlewareObsever } from "../core/interfaces/middleware-obsever.interface";
const request = require('request');
export class FbMiddleware {
    private obsevers: Array<MiddlewareObsever>;
    constructor(){
        this.obsevers = new Array<MiddlewareObsever>();
    }
    getHttpClient(){
        return request;
    }
    subscribeObsever(obsever: MiddlewareObsever) {
        if (this.obsevers == null)
            this.obsevers = new Array<MiddlewareObsever>();
        this.obsevers.push(obsever);
    }
    sendMessage(requestMethod: HttpRequestMethod, url: string, accessToken: string, body: FbMessageModel, callback){
        //console.log(JSON.stringify(body, null, 4));
        this.obsevers.forEach(function (obsever: MiddlewareObsever) {
            obsever.beforeExecuteRequest(this);
        }.bind(this));
        request({
            "uri": url,
            "qs": {access_token: accessToken},
            "method": requestMethod,
            "json": body
        }, (err, res, body) => {
            if (!err) {
                this.obsevers.forEach(function (obsever: MiddlewareObsever) {
                    obsever.onSucces(this, res);
                }.bind(this));
            } else {
                this.obsevers.forEach(function (obsever: MiddlewareObsever) {
                    obsever.onError(this, res);
                }.bind(this));
            }
			//console.log(err);
			//console.log(res);
            callback({statusCode: res.statusCode, body: body});
        });
    }
    getInfo(requestMethod: HttpRequestMethod, url: string, accessToken: string, fields:string, body: FbMessageModel, callback){
        this.obsevers.forEach(function (obsever: MiddlewareObsever) {
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
                this.obsevers.forEach(function (obsever: MiddlewareObsever) {
                    obsever.onSucces(this, res);
                }.bind(this));
                
            } else {
                this.obsevers.forEach(function (obsever: MiddlewareObsever) {
                    obsever.onError(this, res);
                }.bind(this));
            }
           
            callback({statusCode: res.statusCode, body: JSON.parse(body)});
        });
    }
}