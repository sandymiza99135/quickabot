import { Chain } from "../../interfaces/chain.interface";
import { FbMiddleware } from "../../middlewares/fb-middleware";
import { SessionService } from "../../services/session.service";
import { AppConfig } from "../../app-start/app-config";
import { HttpRequestMethod } from "../../core/enums/http-request-method.enum";
import { FbTextMessageBuilder } from "../../builders/fb-text-message.builder";
import { transService } from "../../app-start/locale-config";
import { QuestionResponseProcessChainResolver } from "../../resolvers/question-response-process-chain.resolver";
import { QuestionResponseStepEnum } from "../../enums/process/question-response-step.enum";
import { FbButtonMessageBuilder } from "../../builders/fb-button-message.builder";
import { FbButtonTemplatePayloadTypeEnum } from "../../enums/fb/fb-button-template-payload-type.enum";
import { FbButtonMessageModel } from "../../models/fb-message-payloads/fb-button-message.model";
import { FbButtonMessageTypeEnum } from "../../enums/fb/fb-button-message-type.enum";
import { QuickAStepEnum } from "../../enums/process/quicka-step.enum";

export class SendMainMenuChain extends Chain {
    private fbMiddlware: FbMiddleware = null
    constructor(sessionService: SessionService, private fbId: string, private accessToken: string) {
        super(sessionService);
        this.fbMiddlware = new FbMiddleware();
    }
    executeProcess(data: any): any {
        super.executeProcess();
        let webhookResponse = new FbButtonMessageBuilder(
            FbButtonTemplatePayloadTypeEnum.BUTTON,
            transService.translate('home.text'),
            [
                {
                    payload: QuestionResponseStepEnum.START_QUESTION_RESPONSE,
                    title: transService.translate('home.boutton.nlp'),
                    type: FbButtonMessageTypeEnum.POSTBACK
                },
                {
                    payload: QuickAStepEnum.START_QUICK_A,
                    title: transService.translate('home.boutton.quickA'),
                    type: FbButtonMessageTypeEnum.POSTBACK
                }
            ] as Array<FbButtonMessageModel>
        ).getFbMessageInstance(this.fbId)

        //console.log(JSON.stringify(webhookResponse, null, 3))
        this.fbMiddlware.sendMessage(
            HttpRequestMethod.POST,
            AppConfig.fbMessageUrl,
            this.accessToken,
            webhookResponse,
            function (data: any) {
                this.executeNextProcess();
            }.bind(this)
        );
    }
}