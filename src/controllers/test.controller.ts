import { BaseController } from "../core/interfaces/base-controller";
import { transService } from "../app-start/locale-config";

export class TestController extends BaseController{

    test(){
        this.response.body = transService.translate('balance.this.is.your.balance.text.1');
    }
}