import { FbMessageModel } from "../models/fb/fb-message.model";

export interface IFbMessageBuilder{
    getFbMessageInstance(recipientId: string): FbMessageModel;
}