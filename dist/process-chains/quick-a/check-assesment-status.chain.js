"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_interface_1 = require("../../interfaces/chain.interface");
const fb_middleware_1 = require("../../middlewares/fb-middleware");
const api_middlware_1 = require("../../middlewares/api-middlware");
const http_request_method_enum_1 = require("../../core/enums/http-request-method.enum");
class CheckAssesmentStatus extends chain_interface_1.Chain {
    constructor(sessionService, fbId, accessToken) {
        super(sessionService);
        this.fbId = fbId;
        this.accessToken = accessToken;
        this.fbMiddlware = null;
        this.apiMiddlware = null;
        this.fbMiddlware = new fb_middleware_1.FbMiddleware();
        this.apiMiddlware = new api_middlware_1.ApiMiddleware();
    }
    executeProcess(userInfosResponse) {
        super.executeProcess();
        let message;
        this.apiMiddlware.sendRequest(http_request_method_enum_1.HttpRequestMethod.POST, "", { fbId: this.fbId }, { message: message }, function (result) {
        });
    }
}
exports.CheckAssesmentStatus = CheckAssesmentStatus;
//# sourceMappingURL=check-assesment-status.chain.js.map