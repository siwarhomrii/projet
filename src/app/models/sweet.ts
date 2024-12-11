import { Comments } from "./comments";
export class Sweet {
    public id: number;
    public name: string;
    public photo: string;
    public price: number;
    public favorite: boolean;
    public date_creation: Date;
    public category:string;
    public weight:number;
    public comments?: Comments[];
    public quantite: number;
    constructor(
        id: number,
        name: string,
        photo: string,
        price: number,
        date_creation: Date,
        category:string,
        weight:number,
        quantite: number
    ) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.price = price;
        this.favorite = false;
        this.date_creation = date_creation;
        this.category=category;
        this.weight=weight;
        this.comments = [];
        this.quantite = quantite;
    }
}