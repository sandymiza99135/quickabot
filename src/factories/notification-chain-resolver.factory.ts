/* import { ProcessChainResolverInterface } from "../interfaces/process-chain-resolver.interface";
import { NotificationEnum } from "../enums/notification.enum";
import { NotificationMessageChainResolver } from "../resolvers/notification/notification-message-chain.resolver";
import { NotificationAttachmentChainResolver } from "../resolvers/notification/notification-attachment-chain.resolver";
import { NotificationJiramaChainResolver } from "../resolvers/notification/notification-jirama-chain.resolver";
import { NotificationFromBoChainResolver } from "../resolvers/notification/notification-from-bo.chain.resolver"; */

export class NotificationChaiResolverFactory{
    
    /* static getNotificationChainByType(notificationType: string, fbId: string, body: any, accestoken:string ): ProcessChainResolverInterface{
        console.log('*Resolver: NotificationChaiResolverFactory')
        if(notificationType == null)  return null;
        
        switch (notificationType) {
            
            case NotificationEnum.MESSAGE: {
                console.log(`Notification type : ${NotificationEnum.MESSAGE}`)
                return new NotificationMessageChainResolver(notificationType, fbId, accestoken);
            }

            case NotificationEnum.ATTACHMENT: {
                const attachment: string = body.url;
                return new NotificationAttachmentChainResolver(notificationType, fbId, attachment, accestoken);
            }

            case NotificationEnum.RECEIPT: {
                console.log(`Notification type : ${NotificationEnum.RECEIPT}`)
                const content:any = body;
                return new NotificationJiramaChainResolver(notificationType, fbId, content, accestoken);
            }

            case NotificationEnum.ACTIVATION: {
                console.log(`Notification type : ${NotificationEnum.ACTIVATION}`)
                return new NotificationFromBoChainResolver(notificationType, fbId, accestoken);
            }
 
        };     
    } */
    
}