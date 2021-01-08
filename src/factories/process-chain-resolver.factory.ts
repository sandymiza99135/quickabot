import { ClientSession } from "../interfaces/client-session.interface";
import { ProcessChainResolverInterface } from "../interfaces/process-chain-resolver.interface";
import { SessionService } from "../services/session.service";
import { QuestionResponseProcessChainResolver } from "../resolvers/question-response-process-chain.resolver";
import { QuestionResponseStepEnum } from "../enums/process/question-response-step.enum";
import { QuickAStepEnum } from "../enums/process/quicka-step.enum";
import { QuickAProcessChainResolver } from "../resolvers/quick-a-process-chain.resolver";

export class ProcessChainResolverFactory{
    
    static getProcessChainResolverBySession(payload: string, session: ClientSession, sessionService: SessionService, fbId: string, accesToken: string): ProcessChainResolverInterface{
        if(session != null){
            //Message Text = input step
            if(payload == null){

                return ProcessChainResolverFactory.getProcessChainResolverByPayload(session.currentStep, sessionService, fbId, accesToken);
            } else {
                //Button clisk = chose in menu
                return ProcessChainResolverFactory.getProcessChainResolverByPayload(payload, sessionService, fbId, accesToken);
            }
        }
        return null;
    }
    private static getProcessChainResolverByPayload(step:string, sessionService: SessionService, fbId: string, accesToken: string):ProcessChainResolverInterface{
        if(step == null || step == ''){
            return null;
        }
        //MAIN PROCESS
        for (let item in QuestionResponseStepEnum) {
            if(step === QuestionResponseStepEnum[item]){
                console.log(`${step} => QuestionResponseProcessChainResolver`)
                return new QuestionResponseProcessChainResolver(sessionService, fbId, accesToken);
            }
        }

        for (let item in QuickAStepEnum) {
            if(step === QuickAStepEnum[item]){
                console.log(`${step} => QuickAProcessChainResolver`)
                return new QuickAProcessChainResolver(sessionService, fbId, accesToken);
            }
        }

        return null;
    }
}