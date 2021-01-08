import { RequestObsever } from "../interfaces/request-obsever.interface";
import { HttpServer } from "../server";

export class RequestObseverResolver {
    private static obseverResolver: RequestObseverResolver = null;
    private static server: HttpServer = null;
    public static getInstance(server: HttpServer):RequestObseverResolver{
        if(RequestObseverResolver.obseverResolver == null){
            RequestObseverResolver.obseverResolver = new RequestObseverResolver();
        }
        RequestObseverResolver.server = server;
        return RequestObseverResolver.obseverResolver;
    }

    appendObsever(obsever: RequestObsever){
        if(RequestObseverResolver.server.obsevers == null){
            RequestObseverResolver.server.obsevers = new Array<RequestObsever>(); 
        }
        RequestObseverResolver.server.obsevers.push(obsever);
    }
}