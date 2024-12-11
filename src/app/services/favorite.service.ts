import { Injectable } from '@angular/core';
import { Sweet } from '../models/sweet';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: Sweet[] = [];
  private favoritesSubject: BehaviorSubject<Sweet[]> = new BehaviorSubject<Sweet[]>(this.favorites);
  constructor() {
    this.loadFavorites();
  }
  addFavorite(sweet: Sweet): void {
    if (!this.isFavorite(sweet)) {
      this.favorites.push(sweet);
      this.saveFavorites();
      this.favoritesSubject.next(this.favorites);
    }
  }
  removeFavorite(sweet: Sweet): void {
    this.favorites = this.favorites.filter(fav => fav.id !== sweet.id);
    this.saveFavorites();
    this.favoritesSubject.next(this.favorites);
  }
  isFavorite(sweet: Sweet): boolean {
    return this.favorites.some(fav => fav.id === sweet.id);
  }
  getFavorites(): Observable<Sweet[]> {
    return this.favoritesSubject.asObservable();
  }
  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
  private loadFavorites(): void {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
      this.favoritesSubject.next(this.favorites);
    }
  }
}