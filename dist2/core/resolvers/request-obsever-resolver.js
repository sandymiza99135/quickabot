"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestObseverResolver {
    static getInstance(server) {
        if (RequestObseverResolver.obseverResolver == null) {
            RequestObseverResolver.obseverResolver = new RequestObseverResolver();
        }
        RequestObseverResolver.server = server;
        return RequestObseverResolver.obseverResolver;
    }
    appendObsever(obsever) {
        if (RequestObseverResolver.server.obsevers == null) {
            RequestObseverResolver.server.obsevers = new Array();
        }
        RequestObseverResolver.server.obsevers.push(obsever);
    }
}
exports.RequestObseverResolver = RequestObseverResolver;
RequestObseverResolver.obseverResolver = null;
RequestObseverResolver.server = null;
//# sourceMappingURL=request-obsever-resolver.js.map