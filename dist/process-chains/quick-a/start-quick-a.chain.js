"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_interface_1 = require("../../interfaces/chain.interface");
const fb_middleware_1 = require("../../middlewares/fb-middleware");
const app_config_1 = require("../../app-start/app-config");
const http_request_method_enum_1 = require("../../core/enums/http-request-method.enum");
const fb_text_message_builder_1 = require("../../builders/fb-text-message.builder");
const locale_config_1 = require("../../app-start/locale-config");
class StartQuickAChain extends chain_interface_1.Chain {
    constructor(sessionService, fbId, accessToken) {
        super(sessionService);
        this.fbId = fbId;
        this.accessToken = accessToken;
        this.fbMiddlware = null;
        this.fbMiddlware = new fb_middleware_1.FbMiddleware();
    }
    executeProcess(userInfosResponse) {
        super.executeProcess();
        this.fbMiddlware.sendMessage(http_request_method_enum_1.HttpRequestMethod.POST, app_config_1.AppConfig.fbMessageUrl, this.accessToken, new fb_text_message_builder_1.FbTextMessageBuilder(locale_config_1.transService.translate('welcome.to.quick.a')).getFbMessageInstance(this.fbId), function (data) {
            this.executeNextProcess();
        }.bind(this));
    }
}
exports.StartQuickAChain = StartQuickAChain;
//# sourceMappingURL=start-quick-a.chain.js.map