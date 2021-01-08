import { InputValidator } from "../interfaces/input-validator.interface";
import { Chain } from "../interfaces/chain.interface";

export class ProcessStepModel{
    step: string;
    chain: Chain;
    validator: InputValidator = null;
    limitOfError: number = -1;
}