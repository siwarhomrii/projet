import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { lastValueFrom } from 'rxjs';
import { Sweet } from '../../models/sweet';
import { SweetService } from '../../services/sweet.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  sweets: Sweet[] = [];
  sweetForm!: FormGroup;
  private readonly formbuilder: FormBuilder = inject(FormBuilder);
  private readonly sweetservice: SweetService = inject(SweetService);

  ngOnInit(): void {
    this.sweetForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Z].*')]],
      description: ['', Validators.required],
      price: ['0', Validators.required],
      category: ['', Validators.required],
      photo: ['', Validators.required],
      datecreation: [new Date(), Validators.required],
      weight: [14, [Validators.required, Validators.min(14)]],
      quantite: [1, [Validators.required, Validators.min(1)]],
    });
    this.sweetservice.getSweets().subscribe(sweets => {
      this.sweets = sweets;
    });
  }

  onSubmit() {
      const lastId = this.sweets[this.sweets.length - 1].id;
      const newId = (lastId + 1);
      const sweetdata = new Sweet(
        newId,
        this.sweetForm.get('name')?.value,
        this.sweetForm.get('photo')?.value,
        this.sweetForm.get('price')?.value,
        this.sweetForm.get('datecreation')?.value,
        this.sweetForm.get('category')?.value,
        Number(this.sweetForm.get('weight')?.value),
        this.sweetForm.get('quantite')?.value
      );
      this.sweetservice.addSweet(sweetdata).subscribe(
        data => {
          alert('Produit ajouté avec succès');
          this.sweetForm.reset();
        }
      );
  }
  }
