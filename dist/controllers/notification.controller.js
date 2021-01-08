"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("../core/interfaces/base-controller");
const app_config_1 = require("../app-start/app-config");
const quicka_message_factory_1 = require("../factories/quicka-message.factory");
const fb_middleware_1 = require("../middlewares/fb-middleware");
const http_request_method_enum_1 = require("../core/enums/http-request-method.enum");
const quicka_message_content_type_enum_1 = require("../enums/quicka/quicka-message-content.type.enum");
const session_service_1 = require("../services/session.service");
const client_session_interface_1 = require("../interfaces/client-session.interface");
class NotificationController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.fbMiddlware = null;
        this.fbMiddlware = new fb_middleware_1.FbMiddleware();
    }
    //POST
    notification() {
        if (this.request.body) {
            console.log("notif body", this.request.body);
            const quickaMessage = this.request.body;
            try {
                if (quickaMessage != null && quickaMessage.fbId != null && quickaMessage.message != null && quickaMessage.message.content != null) {
                    const fbMessage = quicka_message_factory_1.QuickAMessageFactory.GetInstance().GetFbMessage(quickaMessage.fbId, quickaMessage.message);
                    this.fbMiddlware.sendMessage(http_request_method_enum_1.HttpRequestMethod.POST, app_config_1.AppConfig.fbMessageUrl, app_config_1.AppConfig.fbAccessToken, fbMessage, function (data) {
                        //console.log(data);
                        let sessionService = new session_service_1.SessionService();
                        let clientSession = sessionService.getSession(quickaMessage.fbId);
                        if (clientSession == null) {
                            clientSession = new client_session_interface_1.ClientSession(quickaMessage.fbId);
                        }
                        if (quickaMessage.message.content.type == quicka_message_content_type_enum_1.QuickAMessageContentType.POSTBACK_BUTTON || quickaMessage.message.content.type == quicka_message_content_type_enum_1.QuickAMessageContentType.QUICK_REPLY) {
                            if (quickaMessage.message.content.type == quicka_message_content_type_enum_1.QuickAMessageContentType.POSTBACK_BUTTON) {
                                clientSession.payloadType = quickaMessage.message.content.buttons[0].group;
                                let availablePayloads = sessionService.getAvailablePayloads(clientSession.payloadType);
                                if (availablePayloads == null || availablePayloads.length == 0) {
                                    availablePayloads = new Array();
                                    quickaMessage.message.content.buttons.forEach((element) => {
                                        availablePayloads.push({ type: element.group, text: element.title, value: element.id });
                                    });
                                    sessionService.setAvailablePayloads(clientSession.payloadType, availablePayloads);
                                }
                            }
                            else {
                                clientSession.payloadType = quickaMessage.message.content.quickReplies[0].group;
                                let availablePayloads = sessionService.getAvailablePayloads(clientSession.payloadType);
                                if (availablePayloads == null || availablePayloads.length == 0) {
                                    availablePayloads = new Array();
                                    quickaMessage.message.content.quickReplies.forEach((element) => {
                                        availablePayloads.push({ type: element.group, text: element.title, value: element.id });
                                    });
                                    sessionService.setAvailablePayloads(clientSession.payloadType, availablePayloads);
                                }
                            }
                            let availablePayloads1 = sessionService.getAvailablePayloads(clientSession.payloadType);
                            console.log("************************************PAYLOADS  " + clientSession.payloadType + "********************");
                            console.log(JSON.stringify(availablePayloads1, null, 3));
                            console.log("****************************************************************");
                        }
                        else {
                            clientSession.payloadType = null;
                        }
                        sessionService.saveOrUpdateSession(quickaMessage.fbId, clientSession);
                    }.bind(this));
                }
                else {
                    this.response.status = 401;
                    this.response.body = "Bad request";
                }
            }
            catch (_a) {
                this.response.status = 500;
                this.response.body = "Error";
            }
        }
        else {
            this.response.status = 401;
            this.response.body = "Bad request";
        }
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map