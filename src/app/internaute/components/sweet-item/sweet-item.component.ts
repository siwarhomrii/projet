import { Component, Input,inject } from '@angular/core';
import { Sweet } from '../../../models/sweet';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { SweetService } from '../../../services/sweet.service';
import { FavoriteService } from '../../../services/favorite.service';
@Component({
  selector: 'app-sweet-item',
  standalone: true,
  imports: [RouterLink,NgClass],
  templateUrl: './sweet-item.component.html',
  styleUrl: './sweet-item.component.css'
})
export class SweetItemComponent {
  private readonly sweetService:SweetService=inject(SweetService);
  private readonly favoriteService:FavoriteService=inject(FavoriteService)
  @Input() sweet!:Sweet;
  onChangeLikeStatus(sweet: Sweet) {
    sweet.favorite = !sweet.favorite;
    this.sweetService.updateSweet(sweet).subscribe();
    this.favoriteService.addFavorite(sweet);
    if(sweet.favorite==false){
      this.favoriteService.removeFavorite(sweet);
    }
}
}
