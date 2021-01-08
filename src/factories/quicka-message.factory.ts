import { Message } from "../models/quicka/message.model";
import { FbMessageModel } from "../models/fb/fb-message.model";
import { QuickAMessageContentType } from "../enums/quicka/quicka-message-content.type.enum";
import { TextMessageContent } from "../models/quicka/text-message-content.model";
import { FbRecipientModel } from "../models/fb/fb-recepient.model";
import { FbButtonMessageModel } from "../models/fb-message-payloads/fb-button-message.model";
import { FbButtonTemplatePayloadModel } from "../models/fb-message-payloads/fb-button-template-payload.model";
import { FbButtonTemplatePayloadTypeEnum } from "../enums/fb/fb-button-template-payload-type.enum";
import { FbAttachmentTypeMessage } from "../models/fb/fb-attachment-type-message.model";
import { FbMessageTemplateType } from "../enums/fb/fb-message-template-type.enum";
import { FbMessageAttachmentModel } from "../models/fb/fb-message-attachment.model";
import { QuickReplayMessageContent } from "../models/quicka/quick-reply-message-content.model";
import { FbQuickRepliesModel } from "../models/fb-message-payloads/fb-quick-replies.model";
import { PostBackButtonMessageContent } from "../models/quicka/postback-button-message-content.model";
import { PostBackButton } from "../models/quicka/postback-button.model";
import { FbButtonMessageTypeEnum } from "../enums/fb/fb-button-message-type.enum";
import { FbQuickReplyModel } from "../models/fb/fb-quick-reply.model";
import { QuickReplyButton } from "../models/quicka/quick-reply-button.model";

export class QuickAMessageFactory {
    private static instance: QuickAMessageFactory = null;
    public static GetInstance(): QuickAMessageFactory {
        if (this.instance == null) {
            this.instance = new QuickAMessageFactory();
        }
        return this.instance;
    }

    public GetFbMessage(fbId: string, message: Message): FbMessageModel {
        switch (message.content.type) {
            case QuickAMessageContentType.TEXT: {
                return { message: {text: (<TextMessageContent>message.content).value}, recipient: { id: fbId } as FbRecipientModel } as FbMessageModel;
            }
			case QuickAMessageContentType.POSTBACK_BUTTON: {
                let buttonTemplate: FbButtonTemplatePayloadModel = new FbButtonTemplatePayloadModel();
                buttonTemplate.template_type = FbButtonTemplatePayloadTypeEnum.BUTTON;
                buttonTemplate.text = (<PostBackButtonMessageContent>message.content).text;

                buttonTemplate.buttons = new Array<FbButtonMessageModel>();
                (<PostBackButtonMessageContent>message.content).buttons.forEach((element:PostBackButton) => {
                    buttonTemplate.buttons.push({payload: element.id, type: FbButtonMessageTypeEnum.POSTBACK, title:element.title } as FbButtonMessageModel);
                });

                let messageType: FbAttachmentTypeMessage = new FbAttachmentTypeMessage();
                messageType.attachment = {
                    type: FbMessageTemplateType.TEMPLATE,
                    payload: buttonTemplate
                } as FbMessageAttachmentModel;
                let fbTextMessage: FbMessageModel = new FbMessageModel();
                fbTextMessage.recipient = { id: fbId };
                fbTextMessage.message = messageType;
                return fbTextMessage;
            }
            case QuickAMessageContentType.WEB_URL_BUTTON: {
                let buttonTemplate: FbButtonTemplatePayloadModel = new FbButtonTemplatePayloadModel();
                buttonTemplate.template_type = FbButtonTemplatePayloadTypeEnum.BUTTON;
                buttonTemplate.text = (<PostBackButtonMessageContent>message.content).text;

                buttonTemplate.buttons = new Array<FbButtonMessageModel>();
                (<PostBackButtonMessageContent>message.content).buttons.forEach((element:PostBackButton) => {
                    buttonTemplate.buttons.push({url: element.weburl, type: FbButtonMessageTypeEnum.WEB_URL, title:element.title , messenger_extensions: "false", webview_share_button:"hide" } as FbButtonMessageModel);
                });

                let messageType: FbAttachmentTypeMessage = new FbAttachmentTypeMessage();
                messageType.attachment = {
                    type: FbMessageTemplateType.TEMPLATE,
                    payload: buttonTemplate
                } as FbMessageAttachmentModel;
                let fbTextMessage: FbMessageModel = new FbMessageModel();
                fbTextMessage.recipient = { id: fbId };
                fbTextMessage.message = messageType;
                return fbTextMessage;
            }
            case QuickAMessageContentType.QUICK_REPLY: {
                let messageType: FbQuickRepliesModel = new FbQuickRepliesModel();
                messageType.text = (<QuickReplayMessageContent>message.content).text;

                messageType.quick_replies = new Array<FbQuickReplyModel>();
                (<QuickReplayMessageContent>message.content).quickReplies.forEach((element:QuickReplyButton) => {
                    messageType.quick_replies.push({ payload: element.id, content_type: "text", title:element.title  } as FbQuickReplyModel);
                });

                let fbTextMessage: FbMessageModel = new FbMessageModel();
                fbTextMessage.recipient = { id: fbId};
                fbTextMessage.message = messageType;
                return fbTextMessage;
            }

        }
    }
}