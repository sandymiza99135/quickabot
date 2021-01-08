import { HttpHeader } from "./htt-header.model";

export class HttpRequestModel{
    uri: string;
    queryParams: any;
    body: any;
	files: any;
    headers: Array<HttpHeader>;
    constructor(){
        this.headers = new Array<HttpHeader>();
    }
}