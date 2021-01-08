import { ChannelMessageEnum } from "../../enums/channel-message.enum";

export class Message{
    recipient: string;
    type: ChannelMessageEnum;
    text:string;
    accesToken: string;
}