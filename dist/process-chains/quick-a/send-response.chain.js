"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_middlware_1 = require("../../middlewares/api-middlware");
const chain_interface_1 = require("../../interfaces/chain.interface");
const http_request_method_enum_1 = require("../../core/enums/http-request-method.enum");
const app_config_1 = require("../../app-start/app-config");
class SendResponseChain extends chain_interface_1.Chain {
    constructor(sessionService, fbId, accessToken) {
        super(sessionService);
        this.fbId = fbId;
        this.accessToken = accessToken;
        this.apiMiddleware = null;
        this.apiMiddleware = new api_middlware_1.ApiMiddleware();
    }
    executeProcess(response, isCoordinate = false, isImage = false) {
        super.executeProcess();
        let clientSession = this.sessionService.getSession(this.fbId);
        let url = app_config_1.AppConfig.apiPostMessageUrl;
        let userResponse = { fbId: this.fbId, content: response };
        if (isCoordinate === true) {
            url = app_config_1.AppConfig.apiPostGeolocUrl;
            userResponse = response;
        }
        if (isImage === true) {
            url = app_config_1.AppConfig.apiPostImageUrl;
        }
        console.log("sending to server .................." + url);
        console.log(userResponse);
        this.apiMiddleware.sendRequest(http_request_method_enum_1.HttpRequestMethod.POST, url, null, userResponse, function (data) {
        }.bind(this));
    }
}
exports.SendResponseChain = SendResponseChain;
//# sourceMappingURL=send-response.chain.js.map