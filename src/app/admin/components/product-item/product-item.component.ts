import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Sweet } from '../../../models/sweet';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() sweet!: Sweet;
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<Sweet>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  modifyForm!: FormGroup;
  isEditing = false;

  ngOnInit(): void {
    this.modifyForm = this.fb.nonNullable.group({
      price: [this.sweet.price, [Validators.required]],
      quantite: [this.sweet.quantite, [Validators.required]],
      URL: [this.sweet.photo, [Validators.required]]
    });
  }

  onEdit() {
    this.isEditing = true;
  }

  onSave() {
    if (this.modifyForm.valid) {
      const { price, quantite, URL } = this.modifyForm.value;
      this.sweet.price = price;
      this.sweet.quantite = quantite;
      this.sweet.photo = URL;
      this.update.emit(this.sweet);
      this.isEditing = false;
    }
  }
  onCancel() {
    this.modifyForm.reset({
      price: this.sweet.price,
      quantite: this.sweet.quantite,
      URL: this.sweet.photo
    });
    this.isEditing = false;
  }

  onDelete() {
    this.delete.emit(this.sweet.id);
  }
}
