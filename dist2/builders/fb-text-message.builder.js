"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fb_message_model_1 = require("../models/fb/fb-message.model");
class FbTextMessageBuilder {
    constructor(text) {
        this.text = text;
    }
    getFbMessageInstance(recipientId) {
        let fbTextMessage = new fb_message_model_1.FbMessageModel();
        fbTextMessage.recipient = { id: recipientId };
        fbTextMessage.message = { text: this.text };
        return fbTextMessage;
    }
}
exports.FbTextMessageBuilder = FbTextMessageBuilder;
//# sourceMappingURL=fb-text-message.builder.js.map