"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("../core/interfaces/base-controller");
const session_service_1 = require("../services/session.service");
const app_config_1 = require("../app-start/app-config");
const send_response_chain_1 = require("../process-chains/quick-a/send-response.chain");
const readline = require("readline");
const fs = require("fs");
const login = require("facebook-chat-api");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const request = require('request');
class FbController extends base_controller_1.BaseController {
    constructor() {
        super(...arguments);
        this.adminFbId = "100019450554112";
    }
    //GET
    home() {
        //console.log('***********GET /');
        this.response.body = "Welcome to QuickA API.";
    }
    //GET
    getWebhook() {
        //console.log('***********GET /WEBHOOK');
        var mode = this.request.queryParams["hub.mode"];
        var token = this.request.queryParams["hub.verify_token"];
        var challenge = this.request.queryParams["hub.challenge"];
        if (mode && token) {
            if (mode === "subscribe" && token === "1234567890") {
                console.log("--------- Verification TOKEN : SUCESS");
                this.response.status = 200;
                this.response.body = challenge;
                // res.status(200).send(challenge);
            }
            else {
                this.response.status = 403;
                //res.sendStatus(403);
            }
        }
        else {
            this.response.status = 200;
            this.response.body = "verify.token.failed";
            //res.status(200).send("verify.token.failed");
        }
    }
    getGeolocWebView() {
        this.response.isHtml = true;
        console.log("**********************");
        console.log(this.request.queryParams["psid"]);
        console.log("**********************");
        this.response.body = { psid: this.request.queryParams["psid"] };
        this.response.filePath = app_config_1.AppConfig.geolocTemplate;
    }
    postGeoloc() {
        console.log("\n");
        console.log("************this.request.body**********");
        console.log(this.request.body);
        console.log("**********************");
        let sessionService = new session_service_1.SessionService();
        new send_response_chain_1.SendResponseChain(sessionService, this.request.body.fbId, app_config_1.AppConfig.fbAccessToken).executeProcess(this.request.body, true);
    }
    image() {
        var name = this.request.queryParams["name"];
        console.log(name);
        this.response.isFile = true;
        this.response.filePath = __dirname + "/images/" + name;
    }
    payment() {
        this.sendPostedMessage(this.request.body, 'http://localhost:55013/payment/confirm');
    }
    //POST
    postWebhook() {
        console.log("**********************************");
        let sessionService = new session_service_1.SessionService();
        /* console.log("************************************PAYLOADS********************");
            console.log(JSON.stringify(this.request.body, null, 3));
            console.log("****************************************************************"); */
        if (this.request.body.object === "page") {
            this.request.body.entry.forEach(function (entry) {
                console.log(entry.id);
                if (entry.id == "100757431516152") {
                    //console.log(JSON.stringify(entry, null, '----'));
                    const webhook_event = entry.messaging[0];
                    const sender_psid = webhook_event.sender.id;
                    let clientSession = sessionService.getSession(sender_psid);
                    //if client write a text message & send attachment
                    if (webhook_event.message) {
                        if (webhook_event.message.text) {
                            if (webhook_event.message.quick_reply) {
                                //console.log("Id : " + sender_psid + "  Quickreply : " + webhook_event.message.quick_reply);
                                new send_response_chain_1.SendResponseChain(sessionService, sender_psid, app_config_1.AppConfig.fbAccessToken).executeProcess(webhook_event.message.quick_reply.payload);
                            }
                            else {
                                //console.log("Id : " + sender_psid + "  Text : " + webhook_event.message.text);
                                new send_response_chain_1.SendResponseChain(sessionService, sender_psid, app_config_1.AppConfig.fbAccessToken).executeProcess(webhook_event.message.text);
                            }
                        }
                        else if (webhook_event.message.attachments) {
                            // messsage ATTACHEMENT
                            console.log(webhook_event.message.attachments[0].payload.coordinates);
                            console.log(webhook_event.message.attachments[0].payload.url);
                            //console.log("Id : " + sender_psid + "  attachments : " + webhook_event.message.attachments);
                            if (webhook_event.message.attachments[0].payload.coordinates !=
                                null) {
                                new send_response_chain_1.SendResponseChain(sessionService, sender_psid, app_config_1.AppConfig.fbAccessToken).executeProcess(webhook_event.message.attachments[0].payload.coordinates
                                    .lat +
                                    "," +
                                    webhook_event.message.attachments[0].payload.coordinates.long, true);
                            }
                            else {
                                new send_response_chain_1.SendResponseChain(sessionService, sender_psid, app_config_1.AppConfig.fbAccessToken).executeProcess(webhook_event.message.attachments[0].payload.url);
                            }
                        }
                        //if the client click a button
                    }
                    else if (webhook_event.postback) {
                        //console.log("Id : " + sender_psid + "  Postback : " + webhook_event.postback);
                        new send_response_chain_1.SendResponseChain(sessionService, sender_psid, app_config_1.AppConfig.fbAccessToken).executeProcess(webhook_event.postback.payload);
                    }
                }
                else if (entry.id == "2096059444054569") {
                    this.newMessageReceived(entry);
                }
            }.bind(this));
            this.response.body = "OK";
        }
        else {
            this.response.status = 404;
            this.response.body = "Page not found";
        }
    }
    sendPostedMessage(data, url) {
        const options = {
            url: url,
            json: true,
            body: data
        };
        request.post(options, (err, res, data) => {
            if (err) {
                return console.log(err);
            }
            console.log(`Status: ${res.statusCode}`);
            console.log(data);
        });
    }
    newMessageReceived(entry) {
        const webhook_event = entry.messaging[0];
        const sender_psid = webhook_event.sender.id;
        //if client write a text message & send attachment
        if (webhook_event.message) {
            if (webhook_event.message.text) {
                const userMessage = {
                    userId: sender_psid,
                    pageId: entry.id,
                    message: webhook_event.message.text,
                };
                //this.sendPostedMessage(userMessage, "http://localhost:55013/fb/post");
                login({ appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) }, (err, api) => {
                    if (err)
                        return console.error(err);
                    console.log("adminFbId", this.adminFbId);
                    api.sendMessage({ body: JSON.stringify(userMessage) }, "100019450554112");
                });
            }
            else if (webhook_event.message.attachments) {
                // messsage ATTACHEMENT
                const userMessage = {
                    userId: sender_psid,
                    pageId: entry.id,
                    message: webhook_event.message.attachments[0].payload.url,
                };
                //this.sendPostedMessage(userMessage, "http://localhost:55013/fb/post");
                login({ appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) }, (err, api) => {
                    if (err)
                        return console.error(err);
                    console.log("adminFbId", this.adminFbId);
                    api.sendMessage({ body: JSON.stringify(userMessage) }, "100019450554112");
                });
            }
            //if the client click a button
        }
        else if (webhook_event.postback) {
            const userMessage = {
                userId: sender_psid,
                pageId: entry.id,
                message: webhook_event.postback.payload,
            };
            //this.sendPostedMessage(userMessage, "http://localhost:55013/fb/post");
            login({ appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) }, (err, api) => {
                if (err)
                    return console.error(err);
                console.log("adminFbId", this.adminFbId);
                api.sendMessage({ body: JSON.stringify(userMessage) }, "100019450554112");
            });
        }
    }
    postLogin() {
        login({ email: this.request.body.email, password: this.request.body.password }, (err, api) => {
            if (err) {
                if (err) {
                    switch (err.error) {
                        case "login-approval":
                            console.log("Enter code > ");
                            rl.on("line", (line) => {
                                err.continue(line);
                                rl.close();
                            });
                            break;
                        default:
                            console.error(err);
                    }
                    this.response.status = 400;
                    this.response.body = "Error" + err;
                    return;
                }
            }
            else {
                this.adminFbId = this.request.body.adminFbId;
                fs.writeFileSync("appstate.json", JSON.stringify(api.getAppState()));
                this.response.status = 200;
                this.response.body = "Logging ok....";
            }
        });
    }
}
exports.FbController = FbController;
//# sourceMappingURL=fb.controller.js.map