import { IFbMessageBuilder } from "../interfaces/fb-message-builder.interface";
import { FbMessageModel } from "../models/fb/fb-message.model";
import { FbQuickReplyModel } from "../models/fb-message-payloads/fb-quick-reply.model";
import { FbQuickRepliesModel } from "../models/fb-message-payloads/fb-quick-replies.model";

export class FbQuickReplyMessageBuilder implements IFbMessageBuilder{
    constructor(private text: string, private quickReplies:Array<FbQuickReplyModel>){

    }

    getFbMessageInstance(recipientId: string): FbMessageModel{
        let fbTextMessage: FbMessageModel = new FbMessageModel();
       
        let messageType: FbQuickRepliesModel  = new FbQuickRepliesModel();
        messageType.text = this.text;
        messageType.quick_replies = this.quickReplies;
        
        fbTextMessage.recipient = {id: recipientId};
        fbTextMessage.message = messageType;
        return fbTextMessage;
    }
}