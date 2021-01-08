import { IFbMessageBuilder } from "../interfaces/fb-message-builder.interface";
import { FbButtonTemplatePayloadTypeEnum } from "../enums/fb/fb-button-template-payload-type.enum";
import { FbMessageModel } from "../models/fb/fb-message.model";
import { FbButtonMessageModel } from "../models/fb-message-payloads/fb-button-message.model";
import { FbAttachmentTypeMessage } from "../models/fb/fb-attachment-type-message.model";
import { FbMessageAttachmentModel } from "../models/fb/fb-message-attachment.model";
import { FbMessageTemplateType } from "../enums/fb/fb-message-template-type.enum";
import { FbButtonTemplatePayloadModel } from "../models/fb-message-payloads/fb-button-template-payload.model";

export class FbButtonMessageBuilder implements IFbMessageBuilder{
    constructor(private templateType: FbButtonTemplatePayloadTypeEnum, 
        private text: string, 
        private buttons: Array<FbButtonMessageModel>){
        
    }

    getFbMessageInstance(recipientId: string): FbMessageModel{
        let fbTextMessage: FbMessageModel = new FbMessageModel();
        

        // payload : {}
        let buttonTemplate: FbButtonTemplatePayloadModel = new FbButtonTemplatePayloadModel();
        buttonTemplate.template_type = FbButtonTemplatePayloadTypeEnum.BUTTON;
        buttonTemplate.text = this.text;
        buttonTemplate.buttons = this.buttons;

        // atachement : { payload..}
        let messageType: FbAttachmentTypeMessage  = new FbAttachmentTypeMessage();
        messageType.attachment = {
            type: FbMessageTemplateType.TEMPLATE,
            payload:buttonTemplate
        } as FbMessageAttachmentModel;

        // message : { atachement...}
        fbTextMessage.recipient = {id: recipientId};
        fbTextMessage.message = messageType;

        return fbTextMessage;
    }
}