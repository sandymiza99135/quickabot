"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_interface_1 = require("../../../interfaces/chain.interface");
const fb_middleware_1 = require("../../../middlewares/fb-middleware");
const question_response_step_enum_1 = require("../../../enums/process/question-response-step.enum");
const app_config_1 = require("../../../app-start/app-config");
const question_response_process_chain_resolver_1 = require("../../../resolvers/question-response-process-chain.resolver");
const http_request_method_enum_1 = require("../../../core/enums/http-request-method.enum");
const fb_text_message_builder_1 = require("../../../builders/fb-text-message.builder");
const locale_config_1 = require("../../../app-start/locale-config");
class SaveMatchedServiceChain extends chain_interface_1.Chain {
    constructor(sessionService, fbId, accessToken) {
        super(sessionService);
        this.fbId = fbId;
        this.accessToken = accessToken;
        this.fbMiddlware = null;
        this.fbMiddlware = new fb_middleware_1.FbMiddleware();
    }
    executeProcess(data) {
        super.executeProcess();
        const choosedService = data;
        // Set STATE => client enter a sentence
        let session = this.sessionService.getSession(this.fbId);
        const listOfService = app_config_1.AppConfig.listOfServiceToBeMatched;
        if (listOfService.includes(choosedService)) {
            session.matchedService = choosedService;
            this.executeNextProcess();
        }
        else {
            this.fbMiddlware.sendMessage(http_request_method_enum_1.HttpRequestMethod.POST, app_config_1.AppConfig.fbMessageUrl, this.accessToken, new fb_text_message_builder_1.FbTextMessageBuilder(locale_config_1.transService.translate('wrong.input.not.in.the.list')).getFbMessageInstance(this.fbId), function (data) {
                const ressolver = new question_response_process_chain_resolver_1.QuestionResponseProcessChainResolver(this.sessionService, this.fbId, this.accessToken);
                this.setNextChain(ressolver.getProcessChain(question_response_step_enum_1.QuestionResponseStepEnum.GET_SENTENCE));
                this.executeNextProcess();
            }.bind(this));
        }
    }
}
exports.SaveMatchedServiceChain = SaveMatchedServiceChain;
//# sourceMappingURL=save-matched-service.chain.js.map