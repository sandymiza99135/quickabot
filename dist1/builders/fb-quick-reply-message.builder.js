"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fb_message_model_1 = require("../models/fb/fb-message.model");
const fb_quick_replies_model_1 = require("../models/fb-message-payloads/fb-quick-replies.model");
class FbQuickReplyMessageBuilder {
    constructor(text, quickReplies) {
        this.text = text;
        this.quickReplies = quickReplies;
    }
    getFbMessageInstance(recipientId) {
        let fbTextMessage = new fb_message_model_1.FbMessageModel();
        let messageType = new fb_quick_replies_model_1.FbQuickRepliesModel();
        messageType.text = this.text;
        messageType.quick_replies = this.quickReplies;
        fbTextMessage.recipient = { id: recipientId };
        fbTextMessage.message = messageType;
        return fbTextMessage;
    }
}
exports.FbQuickReplyMessageBuilder = FbQuickReplyMessageBuilder;
//# sourceMappingURL=fb-quick-reply-message.builder.js.map