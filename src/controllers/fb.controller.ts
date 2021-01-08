import { UserMessageEnum } from "../enums/user-message.enum";
import { BaseController } from "../core/interfaces/base-controller";
import { SessionService } from "../services/session.service";
import { ClientSession } from "../interfaces/client-session.interface";
import { ProcessChainResolverInterface } from "../interfaces/process-chain-resolver.interface";
import { ProcessChainResolverFactory } from "../factories/process-chain-resolver.factory";
import { AppConfig } from "../app-start/app-config";
import { GreetingProcessChainResolver } from "../resolvers/greeting-process-chain.resolver";
import { GreetingStepEnum } from "../enums/process/greeting-step.enum";
import { SendResponseChain } from "../process-chains/quick-a/send-response.chain";
import { ReceivedUserMessage } from "../models/channel-message-model/received-user-message";
import { v4 as uuidv4 } from 'uuid';
var path = require('path');
var mkdirp = require('mkdirp');

const readline = require("readline");
const fs = require("fs");
const login = require("facebook-chat-api");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const request = require('request');

export class FbController extends BaseController {
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
      } else {
        this.response.status = 403;
        //res.sendStatus(403);
      }
    } else {
      this.response.status = 200;
      this.response.body = "verify.token.failed";
      //res.status(200).send("verify.token.failed");
    }
  }
  
  getGeolocWebView()
  {
    this.response.isHtml = true;
	console.log("**********************");
		console.log(this.request.queryParams["psid"]);
		console.log("**********************");
	this.response.body = {psid: this.request.queryParams["psid"]};
    this.response.filePath = AppConfig.geolocTemplate;
  }
  
  postGeoloc()
  {
	console.log("\n");
	console.log("************this.request.body**********");
    console.log(this.request.body);
	console.log("**********************");
	let sessionService: SessionService = new SessionService();
	new SendResponseChain(
                    sessionService,
                    this.request.body.fbId,
                    AppConfig.fbAccessToken
    ).executeProcess(this.request.body, true);
  }
  
  image()
  {
    var name = this.request.queryParams["name"];
	console.log(name);
    this.response.isFile = true;
    this.response.filePath = "C:/app/QuickA_dev_1/QuickA.bot/images/" + name;
  }
  
  getImageWebView()
  {
    this.response.isHtml = true;
	console.log("**********************");
		console.log(this.request.queryParams["psid"]);
		console.log("**********************");
	this.response.body = {psid: this.request.queryParams["psid"]};
    this.response.filePath = AppConfig.imageTemplate;
  }
  
  uploadImage()
  {
	console.log(this.request);
	console.log("fezfezf");
	
	try{
		if(this.request.files)
		{
			let avatar = this.request.files.image;
			console.log();
			var filename = uuidv4() + path.extname(avatar.name);
			let fbId = this.request.body.fbId;
			mkdirp('./../../QuickA/QuickA.Api/Files/Photo/' + fbId, function(err) { 
				avatar.mv('./../../QuickA/QuickA.Api/Files/Photo/' + fbId + '/' + filename);
				console.log("\n fbId=" + fbId);
				let sessionService: SessionService = new SessionService();
				new SendResponseChain(
								sessionService,
								fbId,
								AppConfig.fbAccessToken
				).executeProcess(filename, false, true);
   
			});
			
			
			this.response.status = 200;
			this.response.body = {message: filename };
		}else{
			this.response.status = 400;
			this.response.body = {message: "Upload faild" };
		}
		
	}catch(e)
	{
		this.response.status = 400;
		this.response.body = {message: "Upload faild" };
	}
	
  }
  
  payment(){
    this.sendPostedMessage(this.request.body, 'http://localhost:55013/payment/confirm');
  }

	
  //POST
  postWebhook() {
    console.log("**********************************");
    let sessionService: SessionService = new SessionService();
    /* console.log("************************************PAYLOADS********************");
        console.log(JSON.stringify(this.request.body, null, 3));
        console.log("****************************************************************"); */

    if (this.request.body.object === "page") {
      this.request.body.entry.forEach(
        function (entry) {
			console.log(entry.id);
          if (entry.id == "100757431516152") {
            //console.log(JSON.stringify(entry, null, '----'));
            const webhook_event = entry.messaging[0];
            const sender_psid: string = webhook_event.sender.id;
            let clientSession: ClientSession = sessionService.getSession(
              sender_psid
            );
            //if client write a text message & send attachment

            if (webhook_event.message) {
              if (webhook_event.message.text) {
                if (webhook_event.message.quick_reply) {
                  //console.log("Id : " + sender_psid + "  Quickreply : " + webhook_event.message.quick_reply);
                  new SendResponseChain(
                    sessionService,
                    sender_psid,
                    AppConfig.fbAccessToken
                  ).executeProcess(webhook_event.message.quick_reply.payload);
                } else {
                  //console.log("Id : " + sender_psid + "  Text : " + webhook_event.message.text);
                  new SendResponseChain(
                    sessionService,
                    sender_psid,
                    AppConfig.fbAccessToken
                  ).executeProcess(webhook_event.message.text);
                }
              } else if (webhook_event.message.attachments) {
                // messsage ATTACHEMENT
                console.log(
                  webhook_event.message.attachments[0].payload.coordinates
                );
                console.log(webhook_event.message.attachments[0].payload.url);
                //console.log("Id : " + sender_psid + "  attachments : " + webhook_event.message.attachments);
                if (
                  webhook_event.message.attachments[0].payload.coordinates !=
                  null
                ) {
                  new SendResponseChain(
                    sessionService,
                    sender_psid,
                    AppConfig.fbAccessToken
                  ).executeProcess(
                    webhook_event.message.attachments[0].payload.coordinates
                      .lat +
                      "," +
                      webhook_event.message.attachments[0].payload.coordinates.long,
                    true
                  );
                } else {
                  new SendResponseChain(
                    sessionService,
                    sender_psid,
                    AppConfig.fbAccessToken
                  ).executeProcess(
                    webhook_event.message.attachments[0].payload.url
                  );
                }
              }
              //if the client click a button
            } else if (webhook_event.postback) {
              //console.log("Id : " + sender_psid + "  Postback : " + webhook_event.postback);
              new SendResponseChain(
                sessionService,
                sender_psid,
                AppConfig.fbAccessToken
              ).executeProcess(webhook_event.postback.payload);
            }
          }else if(entry.id == "2096059444054569"){
            this.newMessageReceived(entry);
          }
        }.bind(this)
      );
      this.response.body = "OK";
    } else {
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

  adminFbId: string = "100019450554112";
  newMessageReceived(entry) {
    const webhook_event = entry.messaging[0];
    const sender_psid = webhook_event.sender.id;
    //if client write a text message & send attachment
    if (webhook_event.message) {
      if (webhook_event.message.text) {
        const userMessage: ReceivedUserMessage = {
          userId: sender_psid,
          pageId: entry.id,
          message: webhook_event.message.text,
        } as ReceivedUserMessage;
		//this.sendPostedMessage(userMessage, "http://localhost:55013/fb/post");
        login(
          { appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) },
          (err, api) => {
            if (err) return console.error(err);
			console.log("adminFbId", this.adminFbId);
            api.sendMessage(
              { body: JSON.stringify(userMessage) },
              "100019450554112"
            );
          }
        );
      } else if (webhook_event.message.attachments) {
        // messsage ATTACHEMENT
        const userMessage: ReceivedUserMessage = {
          userId: sender_psid,
          pageId: entry.id,
          message: webhook_event.message.attachments[0].payload.url,
        } as ReceivedUserMessage;
		//this.sendPostedMessage(userMessage, "http://localhost:55013/fb/post");
        login(
          { appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) },
          (err, api) => {
            if (err) return console.error(err);
			console.log("adminFbId", this.adminFbId);
            api.sendMessage(
              { body: JSON.stringify(userMessage) },
              "100019450554112"
            );
          }
        );
      }
      //if the client click a button
    } else if (webhook_event.postback) {
      const userMessage: ReceivedUserMessage = {
        userId: sender_psid,
          pageId: entry.id,
        message: webhook_event.postback.payload,
      } as ReceivedUserMessage;
	  //this.sendPostedMessage(userMessage, "http://localhost:55013/fb/post");
      login(
        { appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) },
        (err, api) => {
          if (err) return console.error(err);
		  console.log("adminFbId", this.adminFbId);
          api.sendMessage(
            { body: JSON.stringify(userMessage) },
            "100019450554112"
          );
        }
      );
    }
  }

  postLogin() {
    login(
      { email: this.request.body.email, password: this.request.body.password },
      (err, api) => {
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
        } else {
          this.adminFbId = this.request.body.adminFbId;
          fs.writeFileSync("appstate.json", JSON.stringify(api.getAppState()));
          this.response.status = 200;
          this.response.body = "Logging ok....";
        }
      }
    );
  }
}
