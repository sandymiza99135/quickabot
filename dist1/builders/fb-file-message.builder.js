"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fb_message_model_1 = require("../models/fb/fb-message.model");
const fb_attachment_type_message_model_1 = require("../models/fb/fb-attachment-type-message.model");
const fb_file_message_model_1 = require("../models/fb-message-payloads/fb-file-message.model");
const fb_message_template_type_enum_1 = require("../enums/fb/fb-message-template-type.enum");
class FbFileMessageBuilder {
    constructor(url) {
        this.url = url;
    }
    getFbMessageInstance(recipientId) {
        let fbTextMessage = new fb_message_model_1.FbMessageModel();
        fbTextMessage.recipient = { id: recipientId };
        let messageType = new fb_attachment_type_message_model_1.FbAttachmentTypeMessage();
        fbTextMessage.message = messageType;
        let fileMessage = new fb_file_message_model_1.FbFileMessageModel();
        fileMessage.url = this.url;
        fileMessage.is_reusable = true;
        messageType.attachment = { type: fb_message_template_type_enum_1.FbMessageTemplateType.IMAGE, payload: fileMessage };
        return fbTextMessage;
    }
}
exports.FbFileMessageBuilder = FbFileMessageBuilder;
//# sourceMappingURL=fb-file-message.builder.js.map