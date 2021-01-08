"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fb_button_template_payload_type_enum_1 = require("../enums/fb/fb-button-template-payload-type.enum");
const fb_message_model_1 = require("../models/fb/fb-message.model");
const fb_attachment_type_message_model_1 = require("../models/fb/fb-attachment-type-message.model");
const fb_message_template_type_enum_1 = require("../enums/fb/fb-message-template-type.enum");
const fb_button_template_payload_model_1 = require("../models/fb-message-payloads/fb-button-template-payload.model");
class FbButtonMessageBuilder {
    constructor(templateType, text, buttons) {
        this.templateType = templateType;
        this.text = text;
        this.buttons = buttons;
    }
    getFbMessageInstance(recipientId) {
        let fbTextMessage = new fb_message_model_1.FbMessageModel();
        // payload : {}
        let buttonTemplate = new fb_button_template_payload_model_1.FbButtonTemplatePayloadModel();
        buttonTemplate.template_type = fb_button_template_payload_type_enum_1.FbButtonTemplatePayloadTypeEnum.BUTTON;
        buttonTemplate.text = this.text;
        buttonTemplate.buttons = this.buttons;
        // atachement : { payload..}
        let messageType = new fb_attachment_type_message_model_1.FbAttachmentTypeMessage();
        messageType.attachment = {
            type: fb_message_template_type_enum_1.FbMessageTemplateType.TEMPLATE,
            payload: buttonTemplate
        };
        // message : { atachement...}
        fbTextMessage.recipient = { id: recipientId };
        fbTextMessage.message = messageType;
        return fbTextMessage;
    }
}
exports.FbButtonMessageBuilder = FbButtonMessageBuilder;
//# sourceMappingURL=fb-button-message.builder.js.map