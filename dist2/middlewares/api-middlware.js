"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('request');
class ApiMiddleware {
    sendRequest(requestMethod, url, queryParam, body, callback) {
        request({
            "uri": url,
            "qs": queryParam,
            "method": requestMethod,
            "json": body
        }, (err, res, body) => {
            callback(body);
        });
    }
}
exports.ApiMiddleware = ApiMiddleware;
//# sourceMappingURL=api-middlware.js.map