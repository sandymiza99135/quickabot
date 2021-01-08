import { HttpServer } from "./core/server";
import { RouteResolver } from "./core/resolvers/route-resolver";
import { RequestObseverResolver } from "./core/resolvers/request-obsever-resolver";
import { RequestObseverConfig } from "./app-start/request-obsever-config";
import { RouteConfig } from "./app-start/route-config";
import { AppConfig } from "./app-start/app-config";
//require('log-timestamp');

let server = new HttpServer(AppConfig.port);
server.start();
let routeResolver = RouteResolver.getInstance(server);
RouteConfig.register(routeResolver);
server.registerRoutes();
let obseverResolver = RequestObseverResolver.getInstance(server);
RequestObseverConfig.registerObsever(obseverResolver);


