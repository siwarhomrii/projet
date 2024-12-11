import { Sweet } from "./sweet";
export class CartItem {
    public sweet:Sweet;
    public quantite:number;
    public price:number;
    constructor(quantite:number,sweet:Sweet){
        this.sweet=sweet;
        this.quantite=quantite;
        this.price=this.sweet.price*this.quantite
    }
}
