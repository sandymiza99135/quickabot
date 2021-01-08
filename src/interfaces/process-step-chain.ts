import { Chain } from "./chain.interface";

export interface ProcessStepChain{
    stepName: any;
    process: Chain;
    startProcess();
}