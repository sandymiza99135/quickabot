import { FbButtonPayloadEnum } from "../enums/fb/fb-button-payload.enum";
import { ClientSession } from "../interfaces/client-session.interface";
import { QuestionResponseSession } from "../models/sessions/question-response.session";
export class ClientSessionFactory{
    createInstanceByButtonPayload(payload: FbButtonPayloadEnum, fbId: string): ClientSession{
        switch(payload){
            case FbButtonPayloadEnum.QUESTION_RESPONSE: return new QuestionResponseSession(fbId);       
        }
        return null;
    }
}