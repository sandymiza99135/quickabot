import { MessageContent } from "./message-content.model";
import { FbQuickReplyModel } from "../fb/fb-quick-reply.model";
import { QuickReplyButton } from "./quick-reply-button.model";

export class QuickReplayMessageContent extends MessageContent{
    text: string;
    quickReplies: Array<QuickReplyButton>;
}