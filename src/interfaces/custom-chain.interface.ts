import { Chain } from "./chain.interface";
import { FbMiddleware } from "../middlewares/fb-middleware";
import { TranslationService } from "../translations/translation-service";
import { HttpRequestMethod } from "../core/enums/http-request-method.enum";
import { AppConfig } from "../app-start/app-config";
import { FbTextMessageBuilder } from "../builders/fb-text-message.builder";
import { SessionService } from "../services/session.service";

export class CustomChain extends Chain{
    test(sessionService: SessionService, fbMiddlware: FbMiddleware, transService: TranslationService,fbId: string,accessToken: string,property: string,attemptLimit: boolean){
        console.log("test");
    }
    finishProcessWithNotValidInput(
        sessionService: SessionService,
        fbMiddlware: FbMiddleware, 
        transService: TranslationService ,
        fbId: string, 
        accessToken: string, 
        property: string, 
        attemptLimit: boolean,
        nextProcessChainOnNotAttemptLimit: Chain,
        dataForNextChain: any = null
    ){
        let message = property + '.input';
        if(attemptLimit){
            sessionService.removeSession(fbId);
            this.setNextChain(null);
            message = property + '.input';
        }
        fbMiddlware.sendMessage(
            HttpRequestMethod.POST, 
            AppConfig.fbMessageUrl,
            accessToken, 
            new FbTextMessageBuilder(transService.translate(message)).getFbMessageInstance(fbId),
            function(data: any){
                if(!attemptLimit){
                    this.setNextChain(nextProcessChainOnNotAttemptLimit);
                    this.executeNextProcess(dataForNextChain);
                }
            }.bind(this)
        );
    }

}