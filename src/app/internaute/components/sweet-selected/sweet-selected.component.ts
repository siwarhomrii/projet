import { Component,EventEmitter,inject, OnInit, Output} from '@angular/core';
import { ActivatedRoute, RouterLink, } from '@angular/router';
import { Sweet } from '../../../models/sweet';
import { SweetService } from '../../../services/sweet.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart-service.service';
import { Comments } from '../../../models/comments';
import { DatePipe, DecimalPipe, JsonPipe, NgClass } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { NombrepiecePipe } from '../../../nombrepiece.pipe';
import { FavoriteService } from '../../../services/favorite.service';
import { CurrencyService } from '../../../services/geolocation.service';

@Component({
  selector: 'app-sweet-selected',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, DatePipe, NavbarComponent,DecimalPipe,NombrepiecePipe,NgClass,RouterLink],
  templateUrl: './sweet-selected.component.html',
  styleUrl: './sweet-selected.component.css'
})
export class SweetSelectedComponent implements OnInit{
  activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  private readonly sweetService:SweetService=inject(SweetService);
  private readonly cartService:CartService=inject(CartService);
  private readonly formBuilder:FormBuilder=inject(FormBuilder);
  private readonly favoriteService:FavoriteService=inject(FavoriteService);
  id!:number;
  sweet!: Sweet;
  commentForm!:FormGroup;
  vue=false;
  ngOnInit(): void {
      this.id=Number(this.activatedRoute.snapshot.params['idf']);
      this.loadSweet();
      this.commentForm=this.formBuilder.nonNullable.group({
        user:['',Validators.required],
        comment:['',Validators.required]
      })
  }
  loadSweet(){
    this.sweetService.getSweet(this.id).subscribe(
      (data: Sweet)=>{this.sweet=data;}
    )
  }
   quantiteForm: FormGroup=new FormGroup({
    quantite: new FormControl(1)
   })

  onAddCart(sweet: Sweet): void {
    const quantiteValue = this.quantiteForm.get('quantite')?.value;
    if (this.sweet) {
        this.cartService.addToCart(sweet, quantiteValue);
    }
}
test = false; 
  display() {
    this.test = !this.test;
  }
  onAddComment(sweet:Sweet) {
    if (this.commentForm.valid) {
      const newComment = new Comments(
        this.commentForm.get('user')?.value,
        new Date(),
        this.commentForm.get('comment')?.value
      );
      if (!this.sweet.comments) {
        this.sweet.comments = [];
      }
      this.sweet.comments.push(newComment);
      this.sweetService.updateSweet(this.sweet).subscribe(() => {
        this.commentForm.reset();
      });
    }
  }
  onDisplayCommentZone(){
    this.vue = !this.vue;
  }
    public isRequeried(){
      return this.commentForm.get('user')?.errors?.['required'] && this.commentForm.get('user')?.dirty;
    }
    public isRequeried1(){
      return this.commentForm.get('comment')?.errors?.['required'] && this.commentForm.get('comment')?.dirty;
    }
    onChangeLikeStatus(sweet: Sweet) {
      sweet.favorite = !sweet.favorite;
      this.sweetService.updateSweet(sweet).subscribe();
      this.favoriteService.addFavorite(sweet);
      if(sweet.favorite==false){
        this.favoriteService.removeFavorite(sweet);
      }
  }
 
}


