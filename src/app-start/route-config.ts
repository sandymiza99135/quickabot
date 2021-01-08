import { RouteResolver } from "../core/resolvers/route-resolver";
import { Route } from "../core/models/route";
import { HttpRequestMethod } from "../core/enums/http-request-method.enum";
import { TestController } from "../controllers/test.controller";
import { FbController } from "../controllers/fb.controller";
import { NotificationController } from "../controllers/notification.controller";

export class RouteConfig {
    public static register(routeResolver: RouteResolver) {
        routeResolver.appendRoute(
            {
                controller: () => { return new FbController() },
                action: 'home',
                requestMethod: HttpRequestMethod.GET,
                uri: '/'
            } as Route
        );
		
		routeResolver.appendRoute(
            {
                controller: () => { return new FbController() },
                action: 'getGeolocWebView',
                requestMethod: HttpRequestMethod.GET,
                uri: '/geoloc-view'
            } as Route
        );
		
		routeResolver.appendRoute(
            {
                controller: () => { return new FbController() },
                action: 'postGeoloc',
                requestMethod: HttpRequestMethod.POST,
                uri: '/geoloc'
            } as Route
        );
		
		routeResolver.appendRoute(
            {
                controller: () => { return new FbController() },
                action: 'image',
                requestMethod: HttpRequestMethod.GET,
                uri: '/image'
            } as Route
        );
		
		
		routeResolver.appendRoute(
            {
                controller: () => { return new FbController() },
                action: 'getImageWebView',
                requestMethod: HttpRequestMethod.GET,
                uri: '/image-view'
            } as Route
        );
		
		routeResolver.appendRoute(
            {
                controller: () => { return new FbController() },
                action: 'uploadImage',
                requestMethod: HttpRequestMethod.POST,
                uri: '/uploadImage'
            } as Route
        );
		
		routeResolver.appendRoute(
            {
                controller: () => { return new FbController() },
                action: 'payment',
                requestMethod: HttpRequestMethod.POST,
                uri: '/payment'
            } as Route
        );

        routeResolver.appendRoute(
            {
                controller: () => { return new FbController() },
                action: 'getWebhook',
                requestMethod: HttpRequestMethod.GET,
                uri: '/webhook'
            } as Route
        );

        routeResolver.appendRoute(
            {
                controller: () => { return new FbController() },
                action: 'postLogin',
                requestMethod: HttpRequestMethod.POST,
                uri: '/login'
            } as Route
        );

        routeResolver.appendRoute(
            {
                controller: () => { return new FbController() },
                action: 'postWebhook',
                requestMethod: HttpRequestMethod.POST,
                uri: '/webhook'
            } as Route
        );

        routeResolver.appendRoute(
            {
                controller: () => { return new NotificationController() },
                action: 'notification',
                requestMethod: HttpRequestMethod.POST,
                uri: '/notification',
                useDefaultLogic: true
            } as Route
        );

        routeResolver.appendRoute(
            {
                controller: () => { return new FbController() },
                action: 'pinWebview',
                requestMethod: HttpRequestMethod.GET,
                uri: '/pinwebview'
            } as Route
        );

        routeResolver.appendRoute(
            {
                controller: () => { return new FbController() },
                action: 'pinWebviewPostBack',
                requestMethod: HttpRequestMethod.POST,
                uri: '/pinwebviewpostback'
            } as Route
        );

        routeResolver.appendRoute(
            {
                controller: () => { return new FbController() },
                action: 'test',
                requestMethod: HttpRequestMethod.GET,
                uri: '/test'
            } as Route
        );
    }
}