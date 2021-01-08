import { QuickAMessageContentType } from "../enums/quicka/quicka-message-content.type.enum";

export class ClientSession{
    index:number = -1;
    lastQuickAMessageType: QuickAMessageContentType;
    payloadType: string;
    currentProcess: any;
    currentStep: any;
    fbId: string;
    constructor(fbId: string){
        this.fbId = fbId;
    }
}