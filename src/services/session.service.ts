import { Payload } from './../core/models/payload.model';
import { ClientSession } from "../interfaces/client-session.interface";
let FbClientSession: Array<ClientSession> = [];
let AvailablePayloads : Array<Payload> = [];
export class SessionService{
    getSession(fbId: string): ClientSession{
        let index: number = this.getSessionIndex(fbId);
        if(index == -1) return null;
        FbClientSession[index].index = index;
        return FbClientSession[index];
    }

    getAvailablePayloads(payloadType: string): Array<Payload>{
        return AvailablePayloads.filter(x=> x.type == payloadType);
    }

    setAvailablePayloads(payloadType: string, payloads: Array<Payload>){
        AvailablePayloads = AvailablePayloads.filter(x=>x.type != payloadType);
        if(payloads != null)
        {
            payloads.forEach(element => {
                AvailablePayloads.push(element);
            });
        }
    }

    private getSessionIndex(fbId: string): number{
        return FbClientSession.findIndex((session:ClientSession) => session.fbId == fbId);
    }

    saveOrUpdateSession(fbId: string, session: ClientSession){
        const sessionIndex = this.getSessionIndex(fbId);
        if(sessionIndex  == -1){
            FbClientSession.push(session);
            let index: number = this.getSessionIndex(fbId);
            session.index = index;
        }else{
            FbClientSession[session.index] = session;
        }
    }

    removeSession(fbId: string){
        FbClientSession = FbClientSession.filter((session:ClientSession) => session.fbId != fbId);
    }

    hasSession(fbId: string){
        let index: number = this.getSessionIndex(fbId);
        return index > -1;
    }
}