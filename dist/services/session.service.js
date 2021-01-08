"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let FbClientSession = [];
let AvailablePayloads = [];
class SessionService {
    getSession(fbId) {
        let index = this.getSessionIndex(fbId);
        if (index == -1)
            return null;
        FbClientSession[index].index = index;
        return FbClientSession[index];
    }
    getAvailablePayloads(payloadType) {
        return AvailablePayloads.filter(x => x.type == payloadType);
    }
    setAvailablePayloads(payloadType, payloads) {
        AvailablePayloads = AvailablePayloads.filter(x => x.type != payloadType);
        if (payloads != null) {
            payloads.forEach(element => {
                AvailablePayloads.push(element);
            });
        }
    }
    getSessionIndex(fbId) {
        return FbClientSession.findIndex((session) => session.fbId == fbId);
    }
    saveOrUpdateSession(fbId, session) {
        const sessionIndex = this.getSessionIndex(fbId);
        if (sessionIndex == -1) {
            FbClientSession.push(session);
            let index = this.getSessionIndex(fbId);
            session.index = index;
        }
        else {
            FbClientSession[session.index] = session;
        }
    }
    removeSession(fbId) {
        FbClientSession = FbClientSession.filter((session) => session.fbId != fbId);
    }
    hasSession(fbId) {
        let index = this.getSessionIndex(fbId);
        return index > -1;
    }
}
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map