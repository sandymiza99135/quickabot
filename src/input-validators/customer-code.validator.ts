import { InputValidator } from "../interfaces/input-validator.interface";
import { isNumber } from "util";

export class CustomerCodeValidator implements InputValidator{
    isValid(input: string = null):boolean{
        return true;
        //return (input != null && isNumber(input) && input.length == 28);
    }
}