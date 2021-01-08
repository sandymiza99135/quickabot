"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_request_method_enum_1 = require("../core/enums/http-request-method.enum");
const fb_controller_1 = require("../controllers/fb.controller");
const notification_controller_1 = require("../controllers/notification.controller");
class RouteConfig {
    static register(routeResolver) {
        routeResolver.appendRoute({
            controller: () => { return new fb_controller_1.FbController(); },
            action: 'home',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.GET,
            uri: '/'
        });
        routeResolver.appendRoute({
            controller: () => { return new fb_controller_1.FbController(); },
            action: 'getGeolocWebView',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.GET,
            uri: '/geoloc-view'
        });
        routeResolver.appendRoute({
            controller: () => { return new fb_controller_1.FbController(); },
            action: 'postGeoloc',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.POST,
            uri: '/geoloc'
        });
        routeResolver.appendRoute({
            controller: () => { return new fb_controller_1.FbController(); },
            action: 'image',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.GET,
            uri: '/image'
        });
        routeResolver.appendRoute({
            controller: () => { return new fb_controller_1.FbController(); },
            action: 'getImageWebView',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.GET,
            uri: '/image-view'
        });
        routeResolver.appendRoute({
            controller: () => { return new fb_controller_1.FbController(); },
            action: 'uploadImage',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.POST,
            uri: '/uploadImage'
        });
        routeResolver.appendRoute({
            controller: () => { return new fb_controller_1.FbController(); },
            action: 'payment',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.POST,
            uri: '/payment'
        });
        routeResolver.appendRoute({
            controller: () => { return new fb_controller_1.FbController(); },
            action: 'getWebhook',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.GET,
            uri: '/webhook'
        });
        routeResolver.appendRoute({
            controller: () => { return new fb_controller_1.FbController(); },
            action: 'postLogin',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.POST,
            uri: '/login'
        });
        routeResolver.appendRoute({
            controller: () => { return new fb_controller_1.FbController(); },
            action: 'postWebhook',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.POST,
            uri: '/webhook'
        });
        routeResolver.appendRoute({
            controller: () => { return new notification_controller_1.NotificationController(); },
            action: 'notification',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.POST,
            uri: '/notification',
            useDefaultLogic: true
        });
        routeResolver.appendRoute({
            controller: () => { return new fb_controller_1.FbController(); },
            action: 'pinWebview',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.GET,
            uri: '/pinwebview'
        });
        routeResolver.appendRoute({
            controller: () => { return new fb_controller_1.FbController(); },
            action: 'pinWebviewPostBack',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.POST,
            uri: '/pinwebviewpostback'
        });
        routeResolver.appendRoute({
            controller: () => { return new fb_controller_1.FbController(); },
            action: 'test',
            requestMethod: http_request_method_enum_1.HttpRequestMethod.GET,
            uri: '/test'
        });
    }
}
exports.RouteConfig = RouteConfig;
//# sourceMappingURL=route-config.js.map