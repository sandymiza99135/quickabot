import { MessageContent } from "./message-content.model";
import { FbButtonMessageModel } from "../fb-message-payloads/fb-button-message.model";
import { PostBackButton } from "./postback-button.model";

export class PostBackButtonMessageContent extends MessageContent{
    text: string;
    buttons: Array<PostBackButton>;
}