import { Chain } from "../../../interfaces/chain.interface";
import { FbMiddleware } from "../../../middlewares/fb-middleware";
import { SessionService } from "../../../services/session.service";
import { QuestionResponseSession } from "../../../models/sessions/question-response.session";
import { QuestionResponseStepEnum } from "../../../enums/process/question-response-step.enum";
import { AppConfig } from "../../../app-start/app-config";
import { QuestionResponseProcessChainResolver } from "../../../resolvers/question-response-process-chain.resolver";
import { HttpRequestMethod } from "../../../core/enums/http-request-method.enum";
import { FbTextMessageBuilder } from "../../../builders/fb-text-message.builder";
import { transService } from "../../../app-start/locale-config";

export class SaveMatchedServiceChain extends Chain {
    fbMiddlware: FbMiddleware = null;
    constructor(sessionService: SessionService, private fbId: string, private accessToken: string) {
        super(sessionService);
        this.fbMiddlware = new FbMiddleware();
    }
    executeProcess(data: any): any {
        super.executeProcess();
        const choosedService = <string>data;
        // Set STATE => client enter a sentence
        let session: QuestionResponseSession = <QuestionResponseSession>this.sessionService.getSession(this.fbId);

        const listOfService: string[] = AppConfig.listOfServiceToBeMatched;
        if(listOfService.includes(choosedService)) {
            session.matchedService = choosedService;
            this.executeNextProcess();
        } else {
            this.fbMiddlware.sendMessage(
                HttpRequestMethod.POST,
                AppConfig.fbMessageUrl,
                this.accessToken,
                new FbTextMessageBuilder(transService.translate('wrong.input.not.in.the.list')).getFbMessageInstance(this.fbId),
                function (data: any) {
                    const ressolver = new QuestionResponseProcessChainResolver(this.sessionService, this.fbId, this.accessToken)
                    this.setNextChain(ressolver.getProcessChain(QuestionResponseStepEnum.GET_SENTENCE));
                    this.executeNextProcess()
                }.bind(this)
            );
            
        }
       
    }
}