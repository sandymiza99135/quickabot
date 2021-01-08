import { BaseController } from "../core/interfaces/base-controller";
import { ProcessChainResolverInterface } from "../interfaces/process-chain-resolver.interface";
import { AppConfig } from "../app-start/app-config";
import { NotificationChaiResolverFactory } from "../factories/notification-chain-resolver.factory";
import { Message } from "../models/quicka/message.model";
import { QuickAMessageFactory } from "../factories/quicka-message.factory";
import { FbMessageModel } from "../models/fb/fb-message.model";
import { FbMiddleware } from "../middlewares/fb-middleware";
import { HttpRequestMethod } from "../core/enums/http-request-method.enum";
import { QuickAMessageContentType } from "../enums/quicka/quicka-message-content.type.enum";
import { SessionService } from "../services/session.service";
import { ClientSession } from "../interfaces/client-session.interface";
import { QuickReplayMessageContent } from "../models/quicka/quick-reply-message-content.model";
import { QuickAMessage } from "../models/quicka/quicka-message.model";
import { PostBackButtonMessageContent } from "../models/quicka/postback-button-message-content.model";
import { Payload } from "../core/models/payload.model";
import { PostBackButton } from "../models/quicka/postback-button.model";
import { QuickReplyButton } from "../models/quicka/quick-reply-button.model";

export class NotificationController extends BaseController {
    private fbMiddlware: FbMiddleware = null;
    constructor() {
        super();
        this.fbMiddlware = new FbMiddleware();
    }
    //POST
    notification() {
        if (this.request.body) {
			console.log("notif body", this.request.body);
            const quickaMessage: QuickAMessage = this.request.body;
            try {
                if (quickaMessage != null && quickaMessage.fbId != null && quickaMessage.message != null && quickaMessage.message.content != null) {
                    const fbMessage: FbMessageModel = QuickAMessageFactory.GetInstance().GetFbMessage(quickaMessage.fbId, quickaMessage.message);
                    this.fbMiddlware.sendMessage(
                        HttpRequestMethod.POST,
                        AppConfig.fbMessageUrl,
                        AppConfig.fbAccessToken,
                        fbMessage,
                        function (data) {
							//console.log(data);
                            let sessionService: SessionService = new SessionService();
                            let clientSession: ClientSession = sessionService.getSession(quickaMessage.fbId);
                            if (clientSession == null) {
                                clientSession = new ClientSession(quickaMessage.fbId);
                            }
                            if (quickaMessage.message.content.type == QuickAMessageContentType.POSTBACK_BUTTON || quickaMessage.message.content.type == QuickAMessageContentType.QUICK_REPLY) {
                                if (quickaMessage.message.content.type == QuickAMessageContentType.POSTBACK_BUTTON) {
                                    clientSession.payloadType = (<PostBackButtonMessageContent>quickaMessage.message.content).buttons[0].group;
                                    let availablePayloads: Array<Payload> = sessionService.getAvailablePayloads(clientSession.payloadType);
                                    if (availablePayloads == null || availablePayloads.length == 0) {
                                        availablePayloads = new Array<Payload>();
                                        (<PostBackButtonMessageContent>quickaMessage.message.content).buttons.forEach((element: PostBackButton) => {
                                            availablePayloads.push({ type: element.group, text: element.title, value: element.id } as Payload);
                                        });
                                        sessionService.setAvailablePayloads(clientSession.payloadType, availablePayloads);
                                    }

                                } else {
                                    clientSession.payloadType = (<QuickReplayMessageContent>quickaMessage.message.content).quickReplies[0].group;
                                    let availablePayloads: Array<Payload> = sessionService.getAvailablePayloads(clientSession.payloadType);
                                    if (availablePayloads == null || availablePayloads.length == 0) {
                                        availablePayloads = new Array<Payload>();
                                        (<QuickReplayMessageContent>quickaMessage.message.content).quickReplies.forEach((element: QuickReplyButton) => {
                                            availablePayloads.push({ type: element.group, text: element.title, value: element.id } as Payload);
                                        });
                                        sessionService.setAvailablePayloads(clientSession.payloadType, availablePayloads);
                                    }


                                }
                                let availablePayloads1: Array<Payload> = sessionService.getAvailablePayloads(clientSession.payloadType);
                                console.log("************************************PAYLOADS  " + clientSession.payloadType + "********************");
                                console.log(JSON.stringify(availablePayloads1, null, 3));
                                console.log("****************************************************************");
                            } else {
                                clientSession.payloadType = null;
                            }
                            sessionService.saveOrUpdateSession(quickaMessage.fbId, clientSession);
                        }.bind(this)
                    );
                } else {
                    this.response.status = 401;
                    this.response.body = "Bad request";
                }
            } catch {
                this.response.status = 500;
                this.response.body = "Error";
            }
        } else {
            this.response.status = 401;
            this.response.body = "Bad request";
        }
    }
}
