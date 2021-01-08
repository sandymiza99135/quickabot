import { Chain } from "../../interfaces/chain.interface";
import { SessionService } from "../../services/session.service";
import { ProcessTypeEnum } from "../../enums/process/process-type.enum";
import { QuestionResponseStepEnum } from "../../enums/process/question-response-step.enum";
import { QuestionResponseSession } from "../../models/sessions/question-response.session";

export class StartQuestionResponseChain extends Chain {
    constructor(sessionService: SessionService, private fbId: string) {
        super(sessionService);
    }
    executeProcess(data: any): any {
        super.executeProcess();
        let session: QuestionResponseSession = new QuestionResponseSession(this.fbId);
        session.index = -1;
        session.currentProcess = ProcessTypeEnum.QUESTION_RESPONSE;
        session.currentStep = QuestionResponseStepEnum.START_QUESTION_RESPONSE;
        session.sentence = null;
        session.matchedService = null;
        this.sessionService.saveOrUpdateSession(this.fbId, session);

        this.executeNextProcess();
    }
}