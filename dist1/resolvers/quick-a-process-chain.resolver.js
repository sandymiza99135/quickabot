"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quicka_step_enum_1 = require("../enums/process/quicka-step.enum");
const start_quick_a_chain_1 = require("../process-chains/quick-a/start-quick-a.chain");
class QuickAProcessChainResolver {
    constructor(sessionService, fbId, accessToken) {
        this.sessionService = sessionService;
        this.fbId = fbId;
        this.accessToken = accessToken;
    }
    getProcessChain(step) {
        switch (step) {
            case quicka_step_enum_1.QuickAStepEnum.START_QUICK_A: return this.greetingChain();
            default: return null;
        }
    }
    greetingChain() {
        return new start_quick_a_chain_1.StartQuickAChain(this.sessionService, this.fbId, this.accessToken);
    }
}
exports.QuickAProcessChainResolver = QuickAProcessChainResolver;
//# sourceMappingURL=quick-a-process-chain.resolver.js.map