import { SessionService } from "../services/session.service";
import { QuestionResponseStepEnum } from "../enums/process/question-response-step.enum";
import { ProcessChainResolverInterface } from "../interfaces/process-chain-resolver.interface";
import { Chain } from "../interfaces/chain.interface";
import { StartQuestionResponseChain } from "../process-chains/question-response/start-question-response.chain";
import { InputAnySentenceChain } from "../process-chains/question-response/sentence/input-any-sentence.chain";
import { SaveTypedSentenceChain } from "../process-chains/question-response/sentence/save-typed-sentence.chain";
import { InputServiceToBeMatchedChain } from "../process-chains/question-response/matched-service/input-service-to-be-matched.chain";
import { SaveMatchedServiceChain } from "../process-chains/question-response/matched-service/save-matched-service.chain";
import { LogSentenceToMatcheServiceChain } from "../process-chains/question-response/log-sentence/log-sentence-to-matched-service.chain";
import { EndQuestionResponseChain } from "../process-chains/question-response/end-quesion-response.chain";

export class QuestionResponseProcessChainResolver implements ProcessChainResolverInterface {
    constructor(private sessionService: SessionService, private fbId, private accessToken) {
    }
    
    getProcessChain(step: QuestionResponseStepEnum) {
        switch (step) {
            case QuestionResponseStepEnum.START_QUESTION_RESPONSE: return this.startQuestionResponseChain();
            case QuestionResponseStepEnum.GET_SENTENCE: return this.askClientToEnterAnySentenceChain();
            case QuestionResponseStepEnum.SENTENCE: return this.saveTypedSentenceChain();
            case QuestionResponseStepEnum.GET_MATCHED_SERVICE: return this.askClientToChooseFromQuickRepliesChain();
            case QuestionResponseStepEnum.MATCHED_SERVICE: return this.saveMatchedServcieChain();

            default: return null;
        }
    }

    private startQuestionResponseChain() {
        let chain:Chain = new StartQuestionResponseChain(this.sessionService, this.fbId);
        let nextChain:Chain = this.askClientToEnterAnySentenceChain();
        chain.setNextChain(nextChain)
        return chain;
    }

    private askClientToEnterAnySentenceChain() {
        return new InputAnySentenceChain(this.sessionService, this.fbId, this.accessToken);
    }
    private saveTypedSentenceChain() {
        let chain:Chain = new SaveTypedSentenceChain(this.sessionService, this.fbId);
        let nextChain:Chain = this.askClientToChooseFromQuickRepliesChain();
        chain.setNextChain(nextChain);
        return chain;
    }

    private askClientToChooseFromQuickRepliesChain() {
        return new InputServiceToBeMatchedChain(this.sessionService, this.fbId, this.accessToken);
    }
    private saveMatchedServcieChain() {
        let chain:Chain = new SaveMatchedServiceChain(this.sessionService, this.fbId, this.accessToken)
        let nextChain:Chain = this.logSentenceToMatchedServiceAndEndSession();
        chain.setNextChain(nextChain);
        return chain;
    }

    private logSentenceToMatchedServiceAndEndSession() {
        let chain: Chain = new LogSentenceToMatcheServiceChain(this.sessionService, this.fbId)
        let nextChain:Chain = this.endQuestionResponseChain()
        chain.setNextChain(nextChain);
        return chain;
    }

    private endQuestionResponseChain() {
        return new EndQuestionResponseChain(this.sessionService, this.fbId, this.accessToken);
    }



}