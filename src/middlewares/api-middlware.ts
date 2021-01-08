import { HttpRequestModel } from "../core/models/http-request.model";
import { HttpRequestMethod } from "../core/enums/http-request-method.enum";
const request = require('request');
export class ApiMiddleware{
    sendRequest (requestMethod: HttpRequestMethod, url: string, queryParam: any, body: any, callback){
        request({
            "uri": url,
            "qs": queryParam,
            "method": requestMethod,
            "json": body
        }, (err, res, body) => {
			//console.log(err)
			//console.log(res.body)
			//console.log(body)
            callback(body);
        });
    }

}