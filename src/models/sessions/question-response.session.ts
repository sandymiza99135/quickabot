import { ClientSession } from "../../interfaces/client-session.interface";

export class QuestionResponseSession extends ClientSession{
    constructor(fbId:string){
        super(fbId);
    }
    sentence: string;
    matchedService: string;

}