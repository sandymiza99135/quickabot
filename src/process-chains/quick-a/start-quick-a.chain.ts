import { Chain } from "../../interfaces/chain.interface";
import { FbMiddleware } from "../../middlewares/fb-middleware";
import { SessionService } from "../../services/session.service";
import { AppConfig } from "../../app-start/app-config";
import { HttpRequestMethod } from "../../core/enums/http-request-method.enum";
import { FbTextMessageBuilder } from "../../builders/fb-text-message.builder";
import { transService } from "../../app-start/locale-config";

export class StartQuickAChain extends Chain {
    private fbMiddlware: FbMiddleware = null
    constructor(sessionService: SessionService, private fbId: string, private accessToken: string) {
        super(sessionService);
        this.fbMiddlware = new FbMiddleware();
    }
    executeProcess(userInfosResponse: any): any {
        super.executeProcess();
        this.fbMiddlware.sendMessage(
            HttpRequestMethod.POST,
            AppConfig.fbMessageUrl,
            this.accessToken,
            new FbTextMessageBuilder(transService.translate('welcome.to.quick.a')).getFbMessageInstance(this.fbId),
            function (data: any) {
                this.executeNextProcess();
            }.bind(this)
        );
    }
}