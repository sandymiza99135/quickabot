import { Chain } from "../../../interfaces/chain.interface";
import { FbMiddleware } from "../../../middlewares/fb-middleware";
import { SessionService } from "../../../services/session.service";
import { QuestionResponseSession } from "../../../models/sessions/question-response.session";
import { QuestionResponseStepEnum } from "../../../enums/process/question-response-step.enum";

export class SaveTypedSentenceChain extends Chain {
    constructor(sessionService: SessionService, private fbId: string) {
        super(sessionService);
    }
    executeProcess(data: any): any {
        super.executeProcess();
        const typeSentence = <string>data;
        // Set STATE => client enter a sentence
        let session: QuestionResponseSession = <QuestionResponseSession>this.sessionService.getSession(this.fbId);
        session.sentence = typeSentence;

        this.executeNextProcess();
       
    }
}