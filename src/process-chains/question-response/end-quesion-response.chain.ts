import { Chain } from "../../interfaces/chain.interface";
import { SessionService } from "../../services/session.service";
import { transService } from "../../app-start/locale-config";
import { HttpRequestMethod } from "../../core/enums/http-request-method.enum";
import { AppConfig } from "../../app-start/app-config";
import { FbTextMessageBuilder } from "../../builders/fb-text-message.builder";
import { FbMiddleware } from "../../middlewares/fb-middleware";

export class EndQuestionResponseChain extends Chain {
    fbMiddlware: FbMiddleware;
    constructor(sessionService: SessionService, private fbId: string, private accessToken: string) {
        super(sessionService);
        this.fbMiddlware = new FbMiddleware()
    }
    executeProcess(data: any): any {
        super.executeProcess();
       
        const thanks:string = transService.translate('thanks');

        this.fbMiddlware.sendMessage(
            HttpRequestMethod.POST,
            AppConfig.fbMessageUrl,
            this.accessToken,
            new FbTextMessageBuilder(thanks).getFbMessageInstance(this.fbId),
            function () {
                this.executeNextProcess();
            }.bind(this)
        );

        this.sessionService.removeSession(this.fbId);
    }

}