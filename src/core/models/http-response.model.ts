import { HttpHeader } from "./htt-header.model";

export class HttpResponseModel{
    status: number = 200;
	isFile :boolean;
	isHtml:boolean;
    filePath:string;
    body: any;
    headers: Array<HttpHeader>;
    constructor(){
        this.headers = new Array<HttpHeader>();
    }
}