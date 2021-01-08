import { IFbMessageBuilder } from "../interfaces/fb-message-builder.interface";
import { FbMessageModel } from "../models/fb/fb-message.model";
import { FbAttachmentTypeMessage } from "../models/fb/fb-attachment-type-message.model";
import { FbFileMessageModel } from "../models/fb-message-payloads/fb-file-message.model";
import { FbMessageTemplateType } from "../enums/fb/fb-message-template-type.enum";
import { FbMessageAttachmentModel } from "../models/fb/fb-message-attachment.model";

export class FbFileMessageBuilder implements IFbMessageBuilder{
    constructor(private url: string){

    }

    getFbMessageInstance(recipientId: string): FbMessageModel{
        let fbTextMessage: FbMessageModel = new FbMessageModel();
        fbTextMessage.recipient = {id: recipientId};

        let messageType: FbAttachmentTypeMessage  = new FbAttachmentTypeMessage();
        fbTextMessage.message = messageType;
        

        let fileMessage: FbFileMessageModel = new FbFileMessageModel();
        fileMessage.url = this.url;
        fileMessage.is_reusable = true;

        messageType.attachment = {type: FbMessageTemplateType.IMAGE, payload:fileMessage}as FbMessageAttachmentModel;

        return fbTextMessage;
    }
}