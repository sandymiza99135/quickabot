"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_interface_1 = require("../../../interfaces/chain.interface");
const fb_middleware_1 = require("../../../middlewares/fb-middleware");
const http_request_method_enum_1 = require("../../../core/enums/http-request-method.enum");
const app_config_1 = require("../../../app-start/app-config");
const locale_config_1 = require("../../../app-start/locale-config");
const question_response_step_enum_1 = require("../../../enums/process/question-response-step.enum");
const fb_quick_reply_enum_1 = require("../../../enums/others/fb-quick-reply.enum");
const fb_quick_reply_message_builder_1 = require("../../../builders/fb-quick-reply-message.builder");
class InputServiceToBeMatchedChain extends chain_interface_1.Chain {
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
        session.currentStep = question_response_step_enum_1.QuestionResponseStepEnum.MATCHED_SERVICE;
        const listOfService = app_config_1.AppConfig.listOfServiceToBeMatched;
        const quickReplies = [];
        listOfService.forEach(element => {
            quickReplies.push({
                content_type: fb_quick_reply_enum_1.FbQuickReplyEnum.TEXT,
                title: element,
                payload: element
            });
        });
        this.fbMiddlware.sendMessage(http_request_method_enum_1.HttpRequestMethod.POST, app_config_1.AppConfig.fbMessageUrl, this.accessToken, new fb_quick_reply_message_builder_1.FbQuickReplyMessageBuilder(locale_config_1.transService.translate('ask.to.matche.the.sentence.with.a.service'), quickReplies).getFbMessageInstance(this.fbId), function () {
            this.executeNextProcess();
        }.bind(this));
    }
}
exports.InputServiceToBeMatchedChain = InputServiceToBeMatchedChain;
//# sourceMappingURL=input-service-to-be-matched.chain.js.map