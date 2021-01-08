"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const question_response_step_enum_1 = require("../enums/process/question-response-step.enum");
const start_question_response_chain_1 = require("../process-chains/question-response/start-question-response.chain");
const input_any_sentence_chain_1 = require("../process-chains/question-response/sentence/input-any-sentence.chain");
const save_typed_sentence_chain_1 = require("../process-chains/question-response/sentence/save-typed-sentence.chain");
const input_service_to_be_matched_chain_1 = require("../process-chains/question-response/matched-service/input-service-to-be-matched.chain");
const save_matched_service_chain_1 = require("../process-chains/question-response/matched-service/save-matched-service.chain");
const log_sentence_to_matched_service_chain_1 = require("../process-chains/question-response/log-sentence/log-sentence-to-matched-service.chain");
const end_quesion_response_chain_1 = require("../process-chains/question-response/end-quesion-response.chain");
class QuestionResponseProcessChainResolver {
    constructor(sessionService, fbId, accessToken) {
        this.sessionService = sessionService;
        this.fbId = fbId;
        this.accessToken = accessToken;
    }
    getProcessChain(step) {
        switch (step) {
            case question_response_step_enum_1.QuestionResponseStepEnum.START_QUESTION_RESPONSE: return this.startQuestionResponseChain();
            case question_response_step_enum_1.QuestionResponseStepEnum.GET_SENTENCE: return this.askClientToEnterAnySentenceChain();
            case question_response_step_enum_1.QuestionResponseStepEnum.SENTENCE: return this.saveTypedSentenceChain();
            case question_response_step_enum_1.QuestionResponseStepEnum.GET_MATCHED_SERVICE: return this.askClientToChooseFromQuickRepliesChain();
            case question_response_step_enum_1.QuestionResponseStepEnum.MATCHED_SERVICE: return this.saveMatchedServcieChain();
            default: return null;
        }
    }
    startQuestionResponseChain() {
        let chain = new start_question_response_chain_1.StartQuestionResponseChain(this.sessionService, this.fbId);
        let nextChain = this.askClientToEnterAnySentenceChain();
        chain.setNextChain(nextChain);
        return chain;
    }
    askClientToEnterAnySentenceChain() {
        return new input_any_sentence_chain_1.InputAnySentenceChain(this.sessionService, this.fbId, this.accessToken);
    }
    saveTypedSentenceChain() {
        let chain = new save_typed_sentence_chain_1.SaveTypedSentenceChain(this.sessionService, this.fbId);
        let nextChain = this.askClientToChooseFromQuickRepliesChain();
        chain.setNextChain(nextChain);
        return chain;
    }
    askClientToChooseFromQuickRepliesChain() {
        return new input_service_to_be_matched_chain_1.InputServiceToBeMatchedChain(this.sessionService, this.fbId, this.accessToken);
    }
    saveMatchedServcieChain() {
        let chain = new save_matched_service_chain_1.SaveMatchedServiceChain(this.sessionService, this.fbId, this.accessToken);
        let nextChain = this.logSentenceToMatchedServiceAndEndSession();
        chain.setNextChain(nextChain);
        return chain;
    }
    logSentenceToMatchedServiceAndEndSession() {
        let chain = new log_sentence_to_matched_service_chain_1.LogSentenceToMatcheServiceChain(this.sessionService, this.fbId);
        let nextChain = this.endQuestionResponseChain();
        chain.setNextChain(nextChain);
        return chain;
    }
    endQuestionResponseChain() {
        return new end_quesion_response_chain_1.EndQuestionResponseChain(this.sessionService, this.fbId, this.accessToken);
    }
}
exports.QuestionResponseProcessChainResolver = QuestionResponseProcessChainResolver;
//# sourceMappingURL=question-response-process-chain.resolver.js.map