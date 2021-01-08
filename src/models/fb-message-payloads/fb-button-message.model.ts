import { FbButtonMessageTypeEnum } from "../../enums/fb/fb-button-message-type.enum";
import { FbButtonPayloadEnum } from "../../enums/fb/fb-button-payload.enum";

export class FbButtonMessageModel{
    type: FbButtonMessageTypeEnum;
    title: string;
	url: string;
    payload: string;
	webview_height_ratio: string;
	messenger_extensions: string;
	webview_share_button: string;
	
}