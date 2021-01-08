"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_interface_1 = require("../../interfaces/chain.interface");
const locale_config_1 = require("../../app-start/locale-config");
const http_request_method_enum_1 = require("../../core/enums/http-request-method.enum");
const app_config_1 = require("../../app-start/app-config");
const fb_text_message_builder_1 = require("../../builders/fb-text-message.builder");
const fb_middleware_1 = require("../../middlewares/fb-middleware");
class EndQuestionResponseChain extends chain_interface_1.Chain {
    constructor(sessionService, fbId, accessToken) {
        super(sessionService);
        this.fbId = fbId;
        this.accessToken = accessToken;
        this.fbMiddlware = new fb_middleware_1.FbMiddleware();
    }
    executeProcess(data) {
        super.executeProcess();
        const thanks = locale_config_1.transService.translate('thanks');
        this.fbMiddlware.sendMessage(http_request_method_enum_1.HttpRequestMethod.POST, app_config_1.AppConfig.fbMessageUrl, this.accessToken, new fb_text_message_builder_1.FbTextMessageBuilder(thanks).getFbMessageInstance(this.fbId), function () {
            this.executeNextProcess();
        }.bind(this));
        this.sessionService.removeSession(this.fbId);
    }
}
exports.EndQuestionResponseChain = EndQuestionResponseChain;
//# sourceMappingURL=end-quesion-response.chain.js.map