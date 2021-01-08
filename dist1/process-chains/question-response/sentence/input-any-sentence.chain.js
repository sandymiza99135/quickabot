"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_interface_1 = require("../../../interfaces/chain.interface");
const fb_middleware_1 = require("../../../middlewares/fb-middleware");
const http_request_method_enum_1 = require("../../../core/enums/http-request-method.enum");
const app_config_1 = require("../../../app-start/app-config");
const locale_config_1 = require("../../../app-start/locale-config");
const fb_text_message_builder_1 = require("../../../builders/fb-text-message.builder");
const question_response_step_enum_1 = require("../../../enums/process/question-response-step.enum");
class InputAnySentenceChain extends chain_interface_1.Chain {
    constructor(sessionService, fbId, accessToken) {
        super(sessionService);
        this.fbId = fbId;
        this.accessToken = accessToken;
        this.fbMiddlware = null;
        this.fbMiddlware = new fb_middleware_1.FbMiddleware();
    }
    executeProcess(data) {
        super.executeProcess();
        // Set STATE => client enter a sentence
        let session = this.sessionService.getSession(this.fbId);
        session.currentStep = question_response_step_enum_1.QuestionResponseStepEnum.SENTENCE;
        this.fbMiddlware.sendMessage(http_request_method_enum_1.HttpRequestMethod.POST, app_config_1.AppConfig.fbMessageUrl, this.accessToken, new fb_text_message_builder_1.FbTextMessageBuilder(locale_config_1.transService.translate('ask.client.to.enter.any.sentence')).getFbMessageInstance(this.fbId), function (data) {
            this.executeNextProcess();
        }.bind(this));
    }
}
exports.InputAnySentenceChain = InputAnySentenceChain;
//# sourceMappingURL=input-any-sentence.chain.js.map