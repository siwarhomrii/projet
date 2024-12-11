import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart-service.service';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private readonly cartService: CartService = inject(CartService);
  categories: string[] = Object.values(Category);
  nbr: number = 0;
  searchCategory: string = "";
  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(data => {
      this.nbr = data.items.length;
    });
  }
  @Output() onClick = new EventEmitter<string>();
  emitSearch(): void {
    this.onClick.emit(this.searchCategory);
}

}