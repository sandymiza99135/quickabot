import { ProcessChainResolverInterface } from "../interfaces/process-chain-resolver.interface";
import { GreetingStepEnum } from "../enums/process/greeting-step.enum";
import { SessionService } from "../services/session.service";
import { GetFbFullnameChain } from "../process-chains/api-messenger-plateform/get-fb-fullname.chain";
import { SendGreetingChain } from "../process-chains/greeting/send-greeting-message.chain";
import { SendMainMenuChain } from "../process-chains/greeting/send-main-menu.chain";

export class GreetingProcessChainResolver implements ProcessChainResolverInterface{
    constructor(private sessionService: SessionService, private fbId, private accessToken) {

    }
    getProcessChain(step: GreetingStepEnum) {
        switch (step) {
            case GreetingStepEnum.GREETING: return this.greetingChain();
            default: return null;
        }
    }

    private greetingChain(){
        let chain = new GetFbFullnameChain(this.sessionService, this.fbId, this.accessToken);
        let nextChain = new SendGreetingChain(this.sessionService, this.fbId, this.accessToken);
        chain.setNextChain(nextChain);
        let nextNextChain = new SendMainMenuChain(this.sessionService, this.fbId, this.accessToken);
        nextChain.setNextChain(nextNextChain);
        return chain;
    }
}