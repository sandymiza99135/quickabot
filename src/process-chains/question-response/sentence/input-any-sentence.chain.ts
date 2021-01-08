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

export class InputAnySentenceChain extends Chain {
    private fbMiddlware: FbMiddleware = null
    constructor(sessionService: SessionService, private fbId: string, private accessToken: string) {
        super(sessionService);
        this.fbMiddlware = new FbMiddleware();
    }
    executeProcess(data: any): any {
        super.executeProcess();
     
        // Set STATE => client enter a sentence
        let session: QuestionResponseSession = <QuestionResponseSession>this.sessionService.getSession(this.fbId);
        session.currentStep = QuestionResponseStepEnum.SENTENCE;

        this.fbMiddlware.sendMessage(
            HttpRequestMethod.POST,
            AppConfig.fbMessageUrl,
            this.accessToken,
            new FbTextMessageBuilder(transService.translate('ask.client.to.enter.any.sentence')).getFbMessageInstance(this.fbId),
            function (data: any) {
                this.executeNextProcess();
            }.bind(this)
        );
    }
}