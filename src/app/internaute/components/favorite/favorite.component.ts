import { Component, inject, OnInit } from '@angular/core';
import { FavoriteService } from '../../../services/favorite.service';
import { Sweet } from '../../../models/sweet';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SweetService } from '../../../services/sweet.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [JsonPipe, RouterLink, NavbarComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {
public readonly favoriteService=inject(FavoriteService);
private readonly sweetService:SweetService=inject(SweetService);
liste!:Sweet[];
ngOnInit(): void {
    this.favoriteService.getFavorites().subscribe(
      data=>this.liste=data
    )
}
OnRemoveFromFavorite(sweet:Sweet){
  this.favoriteService.removeFavorite(sweet);
  sweet.favorite=false;
  this.sweetService.updateSweet(sweet).subscribe();

}

}
