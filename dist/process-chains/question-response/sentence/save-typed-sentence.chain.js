"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_interface_1 = require("../../../interfaces/chain.interface");
class SaveTypedSentenceChain extends chain_interface_1.Chain {
    constructor(sessionService, fbId) {
        super(sessionService);
        this.fbId = fbId;
    }
    executeProcess(data) {
        super.executeProcess();
        const typeSentence = data;
        // Set STATE => client enter a sentence
        let session = this.sessionService.getSession(this.fbId);
        session.sentence = typeSentence;
        this.executeNextProcess();
    }
}
exports.SaveTypedSentenceChain = SaveTypedSentenceChain;
//# sourceMappingURL=save-typed-sentence.chain.js.map