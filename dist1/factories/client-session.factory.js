"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fb_button_payload_enum_1 = require("../enums/fb/fb-button-payload.enum");
const question_response_session_1 = require("../models/sessions/question-response.session");
class ClientSessionFactory {
    createInstanceByButtonPayload(payload, fbId) {
        switch (payload) {
            case fb_button_payload_enum_1.FbButtonPayloadEnum.QUESTION_RESPONSE: return new question_response_session_1.QuestionResponseSession(fbId);
        }
        return null;
    }
}
exports.ClientSessionFactory = ClientSessionFactory;
//# sourceMappingURL=client-session.factory.js.map