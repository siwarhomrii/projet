import { Component, inject } from '@angular/core';
import { Sweet } from '../../../models/sweet';
import { SweetService } from '../../../services/sweet.service';
import { ProductItemComponent } from '../product-item/product-item.component';
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductItemComponent, SearchBarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  searchName!:string;
  sweets: Sweet[]=[];
 private readonly sweetservice: SweetService= inject(SweetService);
ngOnInit(): void {
 this.sweetservice.getSweets().subscribe(data =>
  {this.sweets=data;});
}
 deleteSweet(id: number): void {
   this.sweetservice.deleteSweet(id).subscribe(() => {
     this.sweets = this.sweets.filter(sweet => sweet.id !== id); 
   });
 }
updateSweet(updatedSweet: Sweet): void {
  this.sweetservice.updateSweet(updatedSweet).subscribe(() => {
    console.log('Produit mis à jour avec succès');
  });
}
onSearch(name: string): void {
  this.searchName = name;
  console.log(this.searchName);
  this.sweetservice.getSweets().subscribe(sweets => {
    if (this.searchName === '') {
      this.sweets = sweets;
    } else {
      this.sweets = sweets.filter(sweet => {
        const sweetName = sweet.name ? sweet.name.toUpperCase() : '';
        return sweetName.includes(this.searchName.toUpperCase());
      });
    }
  });
}
}

