"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_interface_1 = require("../../interfaces/chain.interface");
const fb_middleware_1 = require("../../middlewares/fb-middleware");
const app_config_1 = require("../../app-start/app-config");
const http_request_method_enum_1 = require("../../core/enums/http-request-method.enum");
const fb_text_message_builder_1 = require("../../builders/fb-text-message.builder");
const locale_config_1 = require("../../app-start/locale-config");
const client_session_interface_1 = require("../../interfaces/client-session.interface");
const process_type_enum_1 = require("../../enums/process/process-type.enum");
const greeting_step_enum_1 = require("../../enums/process/greeting-step.enum");
class SendGreetingChain extends chain_interface_1.Chain {
    constructor(sessionService, fbId, accessToken) {
        super(sessionService);
        this.fbId = fbId;
        this.accessToken = accessToken;
        this.fbMiddlware = null;
        this.fbMiddlware = new fb_middleware_1.FbMiddleware();
    }
    executeProcess(userInfosResponse) {
        super.executeProcess();
        let session = new client_session_interface_1.ClientSession(this.fbId);
        session.currentProcess = process_type_enum_1.ProcessTypeEnum.GREETING_WORKFLOW;
        session.currentStep = greeting_step_enum_1.GreetingStepEnum.GREETING;
        this.sessionService.saveOrUpdateSession(this.fbId, session);
        this.fbMiddlware.sendMessage(http_request_method_enum_1.HttpRequestMethod.POST, app_config_1.AppConfig.fbMessageUrl, this.accessToken, new fb_text_message_builder_1.FbTextMessageBuilder(locale_config_1.transService.translate('hello') + ' ' + userInfosResponse.first_name).getFbMessageInstance(this.fbId), function (data) {
            this.executeNextProcess();
        }.bind(this));
    }
}
exports.SendGreetingChain = SendGreetingChain;
//# sourceMappingURL=send-greeting-message.chain.js.map