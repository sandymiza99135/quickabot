import { Chain } from "../../../interfaces/chain.interface";
import { FbMiddleware } from "../../../middlewares/fb-middleware";
import { SessionService } from "../../../services/session.service";
import { QuestionResponseSession } from "../../../models/sessions/question-response.session";
import { QuestionResponseStepEnum } from "../../../enums/process/question-response-step.enum";
import { LogFileHelper } from "../../../helpers/log-file.helper";

export class LogSentenceToMatcheServiceChain extends Chain {
    constructor(sessionService: SessionService, private fbId: string) {
        super(sessionService);
    }
    executeProcess(data: any): any {
        super.executeProcess();
        // Set STATE => 
        let session: QuestionResponseSession = <QuestionResponseSession>this.sessionService.getSession(this.fbId);
        const sentence = session.sentence;
        const matchedService = session.matchedService;

        // log sentence
        const logHelper = new LogFileHelper();
        logHelper.writeSentence(matchedService, sentence);

        this.executeNextProcess();
       
    }
}