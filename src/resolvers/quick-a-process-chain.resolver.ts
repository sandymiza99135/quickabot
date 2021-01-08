import { ProcessChainResolverInterface } from "../interfaces/process-chain-resolver.interface";
import { SessionService } from "../services/session.service";
import { QuickAStepEnum } from "../enums/process/quicka-step.enum";
import { StartQuickAChain } from "../process-chains/quick-a/start-quick-a.chain";

export class QuickAProcessChainResolver implements ProcessChainResolverInterface{
    constructor(private sessionService: SessionService, private fbId, private accessToken) {

    }

    getProcessChain(step: QuickAStepEnum) {
        switch (step) {
            case QuickAStepEnum.START_QUICK_A: return this.greetingChain();
            default: return null;
        }
    }

    private greetingChain(){
        return new StartQuickAChain(this.sessionService, this.fbId, this.accessToken);
        
    }
    
}