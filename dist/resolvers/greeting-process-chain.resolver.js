"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const greeting_step_enum_1 = require("../enums/process/greeting-step.enum");
const get_fb_fullname_chain_1 = require("../process-chains/api-messenger-plateform/get-fb-fullname.chain");
const send_greeting_message_chain_1 = require("../process-chains/greeting/send-greeting-message.chain");
const send_main_menu_chain_1 = require("../process-chains/greeting/send-main-menu.chain");
class GreetingProcessChainResolver {
    constructor(sessionService, fbId, accessToken) {
        this.sessionService = sessionService;
        this.fbId = fbId;
        this.accessToken = accessToken;
    }
    getProcessChain(step) {
        switch (step) {
            case greeting_step_enum_1.GreetingStepEnum.GREETING: return this.greetingChain();
            default: return null;
        }
    }
    greetingChain() {
        let chain = new get_fb_fullname_chain_1.GetFbFullnameChain(this.sessionService, this.fbId, this.accessToken);
        let nextChain = new send_greeting_message_chain_1.SendGreetingChain(this.sessionService, this.fbId, this.accessToken);
        chain.setNextChain(nextChain);
        let nextNextChain = new send_main_menu_chain_1.SendMainMenuChain(this.sessionService, this.fbId, this.accessToken);
        nextChain.setNextChain(nextNextChain);
        return chain;
    }
}
exports.GreetingProcessChainResolver = GreetingProcessChainResolver;
//# sourceMappingURL=greeting-process-chain.resolver.js.map