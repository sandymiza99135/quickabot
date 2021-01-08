import { Chain } from "../../../interfaces/chain.interface";
import { FbMiddleware } from "../../../middlewares/fb-middleware";
import { SessionService } from "../../../services/session.service";
import { HttpRequestMethod } from "../../../core/enums/http-request-method.enum";
import { AppConfig } from "../../../app-start/app-config";
import { FbButtonMessageBuilder } from "../../../builders/fb-button-message.builder";
import { FbButtonTemplatePayloadTypeEnum } from "../../../enums/fb/fb-button-template-payload-type.enum";
import { transService } from "../../../app-start/locale-config";
import { FbButtonMessageModel } from "../../../models/fb-message-payloads/fb-button-message.model";
import { FbButtonMessageTypeEnum } from "../../../enums/fb/fb-button-message-type.enum";
import { FbTextMessageBuilder } from "../../../builders/fb-text-message.builder";
import { QuestionResponseSession } from "../../../models/sessions/question-response.session";
import { QuestionResponseStepEnum } from "../../../enums/process/question-response-step.enum";
import { FbQuickReplyModel } from "../../../models/fb/fb-quick-reply.model";
import { FbQuickReplyEnum } from "../../../enums/others/fb-quick-reply.enum";
import { FbQuickReplyMessageBuilder } from "../../../builders/fb-quick-reply-message.builder";

export class InputServiceToBeMatchedChain extends Chain {
    private fbMiddlware: FbMiddleware = null
    constructor(sessionService: SessionService, private fbId: string, private accessToken: string) {
        super(sessionService);
        this.fbMiddlware = new FbMiddleware();
    }
    executeProcess(data: any): any {
        super.executeProcess();
     
        // Set STATE => client enter a sentence
        let session: QuestionResponseSession = <QuestionResponseSession>this.sessionService.getSession(this.fbId);
        session.currentStep = QuestionResponseStepEnum.MATCHED_SERVICE;

        const listOfService: string[] = AppConfig.listOfServiceToBeMatched;
        const quickReplies:Array<FbQuickReplyModel> = [];
        listOfService.forEach(element => {
            quickReplies.push({
                content_type: FbQuickReplyEnum.TEXT,
                title: element,
                payload: element
            });
        });

        this.fbMiddlware.sendMessage(
            HttpRequestMethod.POST,
            AppConfig.fbMessageUrl,
            this.accessToken,
            new FbQuickReplyMessageBuilder(
                transService.translate('ask.to.matche.the.sentence.with.a.service'),
                quickReplies
            ).getFbMessageInstance(this.fbId),
            function () {
                this.executeNextProcess();
            }.bind(this)
        );
    }
}