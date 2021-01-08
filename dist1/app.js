"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./core/server");
const route_resolver_1 = require("./core/resolvers/route-resolver");
const request_obsever_resolver_1 = require("./core/resolvers/request-obsever-resolver");
const request_obsever_config_1 = require("./app-start/request-obsever-config");
const route_config_1 = require("./app-start/route-config");
const app_config_1 = require("./app-start/app-config");
//require('log-timestamp');
let server = new server_1.HttpServer(app_config_1.AppConfig.port);
server.start();
let routeResolver = route_resolver_1.RouteResolver.getInstance(server);
route_config_1.RouteConfig.register(routeResolver);
server.registerRoutes();
let obseverResolver = request_obsever_resolver_1.RequestObseverResolver.getInstance(server);
request_obsever_config_1.RequestObseverConfig.registerObsever(obseverResolver);
//# sourceMappingURL=app.js.map