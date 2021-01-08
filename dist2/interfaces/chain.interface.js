"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Chain {
    constructor(sessionService) {
        this.nextProcess = null;
        this.previousProcess = null;
        this.sessionService = null;
        this.sessionService = sessionService;
    }
    executeProcess(data = null) {
        this.previousProcess = null;
    }
    executeNextProcess(data = null) {
        if (this.nextProcess != null) {
            return this.nextProcess.executeProcess(data);
        }
    }
    setNextChain(nextProcess) {
        this.nextProcess = nextProcess;
        nextProcess.previousProcess = this;
    }
}
exports.Chain = Chain;
//# sourceMappingURL=chain.interface.js.map