import { Chain } from "../../interfaces/chain.interface";
import { FbMiddleware } from "../../middlewares/fb-middleware";
import { SessionService } from "../../services/session.service";
import { AppConfig } from "../../app-start/app-config";
import { HttpRequestMethod } from "../../core/enums/http-request-method.enum";
import { FbTextMessageBuilder } from "../../builders/fb-text-message.builder";
import { transService } from "../../app-start/locale-config";
import { QuestionResponseProcessChainResolver } from "../../resolvers/question-response-process-chain.resolver";
import { QuestionResponseStepEnum } from "../../enums/process/question-response-step.enum";
import { ClientSession } from "../../interfaces/client-session.interface";
import { ProcessTypeEnum } from "../../enums/process/process-type.enum";
import { GreetingStepEnum } from "../../enums/process/greeting-step.enum";

export class SendGreetingChain extends Chain {
    private fbMiddlware: FbMiddleware = null
    constructor(sessionService: SessionService, private fbId: string, private accessToken: string) {
        super(sessionService);
        this.fbMiddlware = new FbMiddleware();
    }
    executeProcess(userInfosResponse: any): any {
        super.executeProcess();
        let session: ClientSession = new ClientSession(this.fbId);
        session.currentProcess = ProcessTypeEnum.GREETING_WORKFLOW;
        session.currentStep = GreetingStepEnum.GREETING;
        this.sessionService.saveOrUpdateSession(this.fbId, session)

        this.fbMiddlware.sendMessage(
            HttpRequestMethod.POST,
            AppConfig.fbMessageUrl,
            this.accessToken,
            new FbTextMessageBuilder(transService.translate('hello') +  ' ' + userInfosResponse.first_name).getFbMessageInstance(this.fbId),
            function (data: any) {
                this.executeNextProcess();
            }.bind(this)
        );
    }
}