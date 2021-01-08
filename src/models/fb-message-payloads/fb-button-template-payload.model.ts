import { FbButtonTemplatePayloadTypeEnum } from "../../enums/fb/fb-button-template-payload-type.enum";
import { FbButtonMessageModel } from "./fb-button-message.model";
export class FbButtonTemplatePayloadModel{
    template_type:FbButtonTemplatePayloadTypeEnum;
    text: string;
    buttons: Array<FbButtonMessageModel>;
}