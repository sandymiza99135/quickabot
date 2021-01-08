import { SessionService } from "../services/session.service";


export abstract class Chain {
    protected nextProcess: Chain = null;
    protected previousProcess: Chain = null;
    protected sessionService: SessionService = null;
    executeProcess(data: any = null): any{
        this.previousProcess = null;
    }
    constructor(sessionService: SessionService){
        this.sessionService = sessionService;
    }
    executeNextProcess(data: any = null): any{
        if(this.nextProcess != null){
            return this.nextProcess.executeProcess(data);
        }
    }

    setNextChain(nextProcess: Chain){
        this.nextProcess = nextProcess;
        nextProcess.previousProcess = this;
    }
} 