import { InputValidator } from "../interfaces/input-validator.interface";

export class PinValidator implements InputValidator{
    isValid(input: string = null):boolean{
        return true;
        //return (input != null && isNumber(input) && input.length == 28);
    }
}