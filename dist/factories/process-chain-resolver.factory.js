"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const question_response_process_chain_resolver_1 = require("../resolvers/question-response-process-chain.resolver");
const question_response_step_enum_1 = require("../enums/process/question-response-step.enum");
const quicka_step_enum_1 = require("../enums/process/quicka-step.enum");
const quick_a_process_chain_resolver_1 = require("../resolvers/quick-a-process-chain.resolver");
class ProcessChainResolverFactory {
    static getProcessChainResolverBySession(payload, session, sessionService, fbId, accesToken) {
        if (session != null) {
            //Message Text = input step
            if (payload == null) {
                return ProcessChainResolverFactory.getProcessChainResolverByPayload(session.currentStep, sessionService, fbId, accesToken);
            }
            else {
                //Button clisk = chose in menu
                return ProcessChainResolverFactory.getProcessChainResolverByPayload(payload, sessionService, fbId, accesToken);
            }
        }
        return null;
    }
    static getProcessChainResolverByPayload(step, sessionService, fbId, accesToken) {
        if (step == null || step == '') {
            return null;
        }
        //MAIN PROCESS
        for (let item in question_response_step_enum_1.QuestionResponseStepEnum) {
            if (step === question_response_step_enum_1.QuestionResponseStepEnum[item]) {
                console.log(`${step} => QuestionResponseProcessChainResolver`);
                return new question_response_process_chain_resolver_1.QuestionResponseProcessChainResolver(sessionService, fbId, accesToken);
            }
        }
        for (let item in quicka_step_enum_1.QuickAStepEnum) {
            if (step === quicka_step_enum_1.QuickAStepEnum[item]) {
                console.log(`${step} => QuickAProcessChainResolver`);
                return new quick_a_process_chain_resolver_1.QuickAProcessChainResolver(sessionService, fbId, accesToken);
            }
        }
        return null;
    }
}
exports.ProcessChainResolverFactory = ProcessChainResolverFactory;
//# sourceMappingURL=process-chain-resolver.factory.js.map