import { Component, inject, OnInit } from '@angular/core';
import { Cart } from '../../../models/cart';
import { CartItem } from '../../../models/cartItem';
import { SweetSelectedComponent } from "../sweet-selected/sweet-selected.component";
import { CartService } from '../../../services/cart-service.service';
import { DecimalPipe, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SweetService } from '../../../services/sweet.service';
import { Sweet } from '../../../models/sweet';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order';
import { CurrencyService } from '../../../services/geolocation.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [JsonPipe, RouterLink, ReactiveFormsModule, NavbarComponent,DecimalPipe],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  private readonly cartService: CartService = inject(CartService);
  private readonly sweetService: SweetService = inject(SweetService);
  private readonly orderService: OrderService = inject(OrderService);
  private readonly currencyService:CurrencyService=inject(CurrencyService);
  change: FormGroup = new FormGroup({
    quantite: new FormControl
  })
  cart!: Cart;
  distance!:number;
  calculateDistance(): void {
    this.currencyService.getDistanceToEstablishment().subscribe((data) => {
      this.distance = data;
      console.log('Distance to establishment:', data);
    });
  }
  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe(
      data => this.cart = data
    );
    this.calculateDistance();
  }
  onChangeQuantity(id: number, quantite: number) {
    this.cartService.changeQuantity(id, quantite);
    this.sweetService.getSweet(id).subscribe(
      (sweet: Sweet) => {
        sweet.quantite -= quantite;
        this.sweetService.updateSweet(sweet).subscribe()
      })
  }
  OnRemoveFromCart(id: number, cartItem: CartItem) {
    this.cartService.removeFromCart(id);
    this.sweetService.getSweet(id).subscribe(
      (sweet: Sweet) => {
        sweet.quantite += cartItem.quantite;
        this.sweetService.updateSweet(sweet).subscribe()
      })
  }
  onPlaceOrder() {
    localStorage.setItem('Cart','');
    if(this.distance>10){
      this.cart.totalPrice+=7
      }else{
        this.cart.totalPrice+=3
      }
    this.orderService.getOrders().subscribe(data => {
      let lastOrderId = Number(data[data.length - 1].id);
      let newOrderId = (lastOrderId + 1).toString();
      let newOrder = new Order(newOrderId, this.cart);
      this.orderService.addOrder(newOrder).subscribe(() => {
        this.cart.items=[];
        this.cart.totalPrice=0;
      });
})}
}
