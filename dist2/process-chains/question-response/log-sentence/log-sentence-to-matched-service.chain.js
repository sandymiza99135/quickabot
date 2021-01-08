"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_interface_1 = require("../../../interfaces/chain.interface");
const log_file_helper_1 = require("../../../helpers/log-file.helper");
class LogSentenceToMatcheServiceChain extends chain_interface_1.Chain {
    constructor(sessionService, fbId) {
        super(sessionService);
        this.fbId = fbId;
    }
    executeProcess(data) {
        super.executeProcess();
        // Set STATE => 
        let session = this.sessionService.getSession(this.fbId);
        const sentence = session.sentence;
        const matchedService = session.matchedService;
        // log sentence
        const logHelper = new log_file_helper_1.LogFileHelper();
        logHelper.writeSentence(matchedService, sentence);
        this.executeNextProcess();
    }
}
exports.LogSentenceToMatcheServiceChain = LogSentenceToMatcheServiceChain;
//# sourceMappingURL=log-sentence-to-matched-service.chain.js.map