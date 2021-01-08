"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_interface_1 = require("../../interfaces/chain.interface");
const fb_middleware_1 = require("../../middlewares/fb-middleware");
const app_config_1 = require("../../app-start/app-config");
const http_request_method_enum_1 = require("../../core/enums/http-request-method.enum");
const locale_config_1 = require("../../app-start/locale-config");
const question_response_step_enum_1 = require("../../enums/process/question-response-step.enum");
const fb_button_message_builder_1 = require("../../builders/fb-button-message.builder");
const fb_button_template_payload_type_enum_1 = require("../../enums/fb/fb-button-template-payload-type.enum");
const fb_button_message_type_enum_1 = require("../../enums/fb/fb-button-message-type.enum");
const quicka_step_enum_1 = require("../../enums/process/quicka-step.enum");
class SendMainMenuChain extends chain_interface_1.Chain {
    constructor(sessionService, fbId, accessToken) {
        super(sessionService);
        this.fbId = fbId;
        this.accessToken = accessToken;
        this.fbMiddlware = null;
        this.fbMiddlware = new fb_middleware_1.FbMiddleware();
    }
    executeProcess(data) {
        super.executeProcess();
        let webhookResponse = new fb_button_message_builder_1.FbButtonMessageBuilder(fb_button_template_payload_type_enum_1.FbButtonTemplatePayloadTypeEnum.BUTTON, locale_config_1.transService.translate('home.text'), [
            {
                payload: question_response_step_enum_1.QuestionResponseStepEnum.START_QUESTION_RESPONSE,
                title: locale_config_1.transService.translate('home.boutton.nlp'),
                type: fb_button_message_type_enum_1.FbButtonMessageTypeEnum.POSTBACK
            },
            {
                payload: quicka_step_enum_1.QuickAStepEnum.START_QUICK_A,
                title: locale_config_1.transService.translate('home.boutton.quickA'),
                type: fb_button_message_type_enum_1.FbButtonMessageTypeEnum.POSTBACK
            }
        ]).getFbMessageInstance(this.fbId);
        //console.log(JSON.stringify(webhookResponse, null, 3))
        this.fbMiddlware.sendMessage(http_request_method_enum_1.HttpRequestMethod.POST, app_config_1.AppConfig.fbMessageUrl, this.accessToken, webhookResponse, function (data) {
            this.executeNextProcess();
        }.bind(this));
    }
}
exports.SendMainMenuChain = SendMainMenuChain;
//# sourceMappingURL=send-main-menu.chain.js.map