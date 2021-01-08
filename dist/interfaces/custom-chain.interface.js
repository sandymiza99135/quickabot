"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_interface_1 = require("./chain.interface");
const http_request_method_enum_1 = require("../core/enums/http-request-method.enum");
const app_config_1 = require("../app-start/app-config");
const fb_text_message_builder_1 = require("../builders/fb-text-message.builder");
class CustomChain extends chain_interface_1.Chain {
    test(sessionService, fbMiddlware, transService, fbId, accessToken, property, attemptLimit) {
        console.log("test");
    }
    finishProcessWithNotValidInput(sessionService, fbMiddlware, transService, fbId, accessToken, property, attemptLimit, nextProcessChainOnNotAttemptLimit, dataForNextChain = null) {
        let message = property + '.input';
        if (attemptLimit) {
            sessionService.removeSession(fbId);
            this.setNextChain(null);
            message = property + '.input';
        }
        fbMiddlware.sendMessage(http_request_method_enum_1.HttpRequestMethod.POST, app_config_1.AppConfig.fbMessageUrl, accessToken, new fb_text_message_builder_1.FbTextMessageBuilder(transService.translate(message)).getFbMessageInstance(fbId), function (data) {
            if (!attemptLimit) {
                this.setNextChain(nextProcessChainOnNotAttemptLimit);
                this.executeNextProcess(dataForNextChain);
            }
        }.bind(this));
    }
}
exports.CustomChain = CustomChain;
//# sourceMappingURL=custom-chain.interface.js.map