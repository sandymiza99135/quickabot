import { Chain } from "../../interfaces/chain.interface";
import { SessionService } from "../../services/session.service";
import { FbMiddleware } from "../../middlewares/fb-middleware";
import { ApiMiddleware } from "../../middlewares/api-middlware";
import { HttpRequestMethod } from "../../core/enums/http-request-method.enum";

export class CheckAssesmentStatus extends Chain{
    private fbMiddlware: FbMiddleware = null;
    private apiMiddlware: ApiMiddleware = null;
    constructor(sessionService: SessionService, private fbId: string, private accessToken: string) {
        super(sessionService);
        this.fbMiddlware = new FbMiddleware();
        this.apiMiddlware = new ApiMiddleware();
    }
    executeProcess(userInfosResponse: any): any {
        super.executeProcess();
        let message :{

        };
        this.apiMiddlware.sendRequest(HttpRequestMethod.POST, "", {fbId: this.fbId}, {message:message}, function(result: any){

        });
    }
}