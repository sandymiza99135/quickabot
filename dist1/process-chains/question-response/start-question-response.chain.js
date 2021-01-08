"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_interface_1 = require("../../interfaces/chain.interface");
const process_type_enum_1 = require("../../enums/process/process-type.enum");
const question_response_step_enum_1 = require("../../enums/process/question-response-step.enum");
const question_response_session_1 = require("../../models/sessions/question-response.session");
class StartQuestionResponseChain extends chain_interface_1.Chain {
    constructor(sessionService, fbId) {
        super(sessionService);
        this.fbId = fbId;
    }
    executeProcess(data) {
        super.executeProcess();
        let session = new question_response_session_1.QuestionResponseSession(this.fbId);
        session.index = -1;
        session.currentProcess = process_type_enum_1.ProcessTypeEnum.QUESTION_RESPONSE;
        session.currentStep = question_response_step_enum_1.QuestionResponseStepEnum.START_QUESTION_RESPONSE;
        session.sentence = null;
        session.matchedService = null;
        this.sessionService.saveOrUpdateSession(this.fbId, session);
        this.executeNextProcess();
    }
}
exports.StartQuestionResponseChain = StartQuestionResponseChain;
//# sourceMappingURL=start-question-response.chain.js.map