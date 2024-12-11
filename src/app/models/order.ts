import { Cart } from "./cart";

export class Order {
    id:string;
    sweets:Cart;
    constructor(id:string,sweets:Cart){
        this.id=id;
        this.sweets=sweets;
    }
}
