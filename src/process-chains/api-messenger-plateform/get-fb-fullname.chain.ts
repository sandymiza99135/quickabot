import { FbMiddleware } from "../../middlewares/fb-middleware";
import { SessionService } from "../../services/session.service";
import { Chain } from "../../interfaces/chain.interface";
import { HttpRequestMethod } from "../../core/enums/http-request-method.enum";
import { AppConfig } from "../../app-start/app-config";

export class GetFbFullnameChain extends Chain {
    private fbMiddleware: FbMiddleware = null
    constructor(sessionService: SessionService, private fbId: string, private accessToken: string) {
        super(sessionService);
        this.fbMiddleware = new FbMiddleware();
    }
    executeProcess(nextProcess: Chain): any {
        super.executeProcess();
        this.fbMiddleware.getInfo(
            HttpRequestMethod.GET,
            AppConfig.fbGetInfosUrl + this.fbId + '?',
            AppConfig.fbAccessToken,
            'name,first_name',
            null,
            function (result) {
                this.executeNextProcess(result.body);
            }.bind(this)
        );
    }
}