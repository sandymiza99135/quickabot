"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const abmFbId = 'abm_fb_id';
//const fbHost = 'https://graph.facebook.com/';
const fbHost = 'https://graph.facebook.com/v5.0/';
exports.AppConfig = {
    port: 3000,
    fbMessageUrl: fbHost + 'me/messages/',
    fbGetInfosUrl: fbHost,
    fbAttachmentMessageUrl: fbHost,
    fbAccessToken: process.env.PAGE_ACCESS_TOKEN,
    geolocTemplate: process.cwd() + "\\dist\\public\\geoloc.html",
    //apiPostMessageUrl: 'http://192.168.143.38:61446/api/quicka/post',
    //apiPostGeolocUrl: 'http://192.168.143.38:61446/api/quicka/geoloc',
    apiPostMessageUrl: 'http://localhost:61446/api/quicka/post',
    apiPostGeolocUrl: 'http://localhost:61446/api/quicka/geoloc',
    listOfServiceToBeMatched: ['SOLDE', 'MINI-RELEVE', 'VIREMENT', 'PAIEMENT-JIRAMA', 'ACCESPAY', 'SALUTATION', 'REMERCIEMENT', 'AUTRE']
};
//# sourceMappingURL=app-config.js.map