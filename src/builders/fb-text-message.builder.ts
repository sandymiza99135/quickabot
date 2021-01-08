import { FbMessageModel } from "../models/fb/fb-message.model";
import { IFbMessageBuilder } from "../interfaces/fb-message-builder.interface";
import { FbTextMessage } from "../models/fb-message-payloads/fb-text-message.model";

export class FbTextMessageBuilder implements IFbMessageBuilder{
    constructor(private text:string){

    }
    getFbMessageInstance(recipientId: string): FbMessageModel{
        let fbTextMessage: FbMessageModel = new FbMessageModel();
        fbTextMessage.recipient = {id: recipientId};
        fbTextMessage.message = {text: this.text} as FbTextMessage;
        return fbTextMessage;
    }
}