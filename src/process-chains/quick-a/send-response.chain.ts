import { ApiMiddleware } from "../../middlewares/api-middlware";
import { SessionService } from "../../services/session.service";
import { Chain } from "../../interfaces/chain.interface";
import { HttpRequestMethod } from "../../core/enums/http-request-method.enum";
import { AppConfig } from "../../app-start/app-config";
import { UserResponse } from "../../models/quicka/user-response.model";
import { ClientSession } from "../../interfaces/client-session.interface";
import { Payload } from "../../core/models/payload.model";

export class SendResponseChain extends Chain {
    private apiMiddleware: ApiMiddleware = null
    constructor(sessionService: SessionService, private fbId: string, private accessToken: string) {
        super(sessionService);
        this.apiMiddleware = new ApiMiddleware();
    }
    executeProcess(response: any, isCoordinate:boolean = false, isImage: boolean = false): any {
        super.executeProcess();
        let clientSession: ClientSession = this.sessionService.getSession(this.fbId);
		let url = AppConfig.apiPostMessageUrl;
		let userResponse: any = { fbId: this.fbId, content: response } as UserResponse;
		
		if(isCoordinate === true)
		{
			url = AppConfig.apiPostGeolocUrl;
			userResponse = response;
		}
		
		if(isImage === true)
		{

			url = AppConfig.apiPostImageUrl;
		}
        console.log("sending to server .................." + url);
		console.log(userResponse);
        this.apiMiddleware.sendRequest(
            HttpRequestMethod.POST,
            url,
            null,
            userResponse,
            function (data) {
            }.bind(this)
        );
    }
}