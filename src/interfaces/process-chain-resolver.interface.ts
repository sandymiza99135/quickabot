import { Chain } from "./chain.interface";

export interface ProcessChainResolverInterface{
    getProcessChain(step: any): Chain;
}