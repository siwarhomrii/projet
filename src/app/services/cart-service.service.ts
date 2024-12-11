import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { Sweet } from '../models/sweet';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.cart);

  addToCart(sweet: Sweet, quantite:number): void {
    const cartItem = this.cart.items.find(item => item.sweet.id === sweet.id);
    if (cartItem) {
      cartItem.quantite+=quantite;
      cartItem.price = cartItem.sweet.price * cartItem.quantite;
    } else {
      this.cart.items.push(new CartItem(quantite, sweet));
    }
    this.setCartToLocalStorage();
  }
  removeFromCart(sweetId: number): void {
    this.cart.items = this.cart.items.filter(item => item.sweet.id !==sweetId);
    this.setCartToLocalStorage();
  }
  changeQuantity(sweetId: number, quantity: number): void {
    const cartItem = this.cart.items.find(item => item.sweet.id === sweetId);
    if (!cartItem) return; 
    cartItem.quantite = quantity;
    cartItem.price = quantity * cartItem.sweet.price;
    this.setCartToLocalStorage();
  }
  clearCart(): void {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }
  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart); 
  }
  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}