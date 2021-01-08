"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fb_middleware_1 = require("../../middlewares/fb-middleware");
const chain_interface_1 = require("../../interfaces/chain.interface");
const http_request_method_enum_1 = require("../../core/enums/http-request-method.enum");
const app_config_1 = require("../../app-start/app-config");
class GetFbFullnameChain extends chain_interface_1.Chain {
    constructor(sessionService, fbId, accessToken) {
        super(sessionService);
        this.fbId = fbId;
        this.accessToken = accessToken;
        this.fbMiddleware = null;
        this.fbMiddleware = new fb_middleware_1.FbMiddleware();
    }
    executeProcess(nextProcess) {
        super.executeProcess();
        this.fbMiddleware.getInfo(http_request_method_enum_1.HttpRequestMethod.GET, app_config_1.AppConfig.fbGetInfosUrl + this.fbId + '?', app_config_1.AppConfig.fbAccessToken, 'name,first_name', null, function (result) {
            this.executeNextProcess(result.body);
        }.bind(this));
    }
}
exports.GetFbFullnameChain = GetFbFullnameChain;
//# sourceMappingURL=get-fb-fullname.chain.js.map