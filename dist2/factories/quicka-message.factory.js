"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fb_message_model_1 = require("../models/fb/fb-message.model");
const quicka_message_content_type_enum_1 = require("../enums/quicka/quicka-message-content.type.enum");
const fb_button_template_payload_model_1 = require("../models/fb-message-payloads/fb-button-template-payload.model");
const fb_button_template_payload_type_enum_1 = require("../enums/fb/fb-button-template-payload-type.enum");
const fb_attachment_type_message_model_1 = require("../models/fb/fb-attachment-type-message.model");
const fb_message_template_type_enum_1 = require("../enums/fb/fb-message-template-type.enum");
const fb_quick_replies_model_1 = require("../models/fb-message-payloads/fb-quick-replies.model");
const fb_button_message_type_enum_1 = require("../enums/fb/fb-button-message-type.enum");
class QuickAMessageFactory {
    static GetInstance() {
        if (this.instance == null) {
            this.instance = new QuickAMessageFactory();
        }
        return this.instance;
    }
    GetFbMessage(fbId, message) {
        switch (message.content.type) {
            case quicka_message_content_type_enum_1.QuickAMessageContentType.TEXT: {
                return { message: { text: message.content.value }, recipient: { id: fbId } };
            }
            case quicka_message_content_type_enum_1.QuickAMessageContentType.POSTBACK_BUTTON: {
                let buttonTemplate = new fb_button_template_payload_model_1.FbButtonTemplatePayloadModel();
                buttonTemplate.template_type = fb_button_template_payload_type_enum_1.FbButtonTemplatePayloadTypeEnum.BUTTON;
                buttonTemplate.text = message.content.text;
                buttonTemplate.buttons = new Array();
                message.content.buttons.forEach((element) => {
                    buttonTemplate.buttons.push({ payload: element.id, type: fb_button_message_type_enum_1.FbButtonMessageTypeEnum.POSTBACK, title: element.title });
                });
                let messageType = new fb_attachment_type_message_model_1.FbAttachmentTypeMessage();
                messageType.attachment = {
                    type: fb_message_template_type_enum_1.FbMessageTemplateType.TEMPLATE,
                    payload: buttonTemplate
                };
                let fbTextMessage = new fb_message_model_1.FbMessageModel();
                fbTextMessage.recipient = { id: fbId };
                fbTextMessage.message = messageType;
                return fbTextMessage;
            }
            case quicka_message_content_type_enum_1.QuickAMessageContentType.WEB_URL_BUTTON: {
                let buttonTemplate = new fb_button_template_payload_model_1.FbButtonTemplatePayloadModel();
                buttonTemplate.template_type = fb_button_template_payload_type_enum_1.FbButtonTemplatePayloadTypeEnum.BUTTON;
                buttonTemplate.text = message.content.text;
                buttonTemplate.buttons = new Array();
                message.content.buttons.forEach((element) => {
                    buttonTemplate.buttons.push({ url: element.weburl, type: fb_button_message_type_enum_1.FbButtonMessageTypeEnum.WEB_URL, title: element.title, messenger_extensions: "false", webview_share_button: "hide" });
                });
                let messageType = new fb_attachment_type_message_model_1.FbAttachmentTypeMessage();
                messageType.attachment = {
                    type: fb_message_template_type_enum_1.FbMessageTemplateType.TEMPLATE,
                    payload: buttonTemplate
                };
                let fbTextMessage = new fb_message_model_1.FbMessageModel();
                fbTextMessage.recipient = { id: fbId };
                fbTextMessage.message = messageType;
                return fbTextMessage;
            }
            case quicka_message_content_type_enum_1.QuickAMessageContentType.QUICK_REPLY: {
                let messageType = new fb_quick_replies_model_1.FbQuickRepliesModel();
                messageType.text = message.content.text;
                messageType.quick_replies = new Array();
                message.content.quickReplies.forEach((element) => {
                    messageType.quick_replies.push({ payload: element.id, content_type: "text", title: element.title });
                });
                let fbTextMessage = new fb_message_model_1.FbMessageModel();
                fbTextMessage.recipient = { id: fbId };
                fbTextMessage.message = messageType;
                return fbTextMessage;
            }
        }
    }
}
exports.QuickAMessageFactory = QuickAMessageFactory;
QuickAMessageFactory.instance = null;
//# sourceMappingURL=quicka-message.factory.js.map