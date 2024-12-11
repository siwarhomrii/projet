import { Component, inject, OnInit } from '@angular/core';
import { SweetService } from '../../../services/sweet.service';
import { Sweet } from '../../../models/sweet';
import { SweetItemComponent } from '../sweet-item/sweet-item.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SearchClientComponent } from "../search-client/search-client.component";
@Component({
  selector: 'app-sweet-list',
  standalone: true,
  imports: [SweetItemComponent, RouterLink, NavbarComponent, SearchClientComponent],
  templateUrl: './sweet-list.component.html',
  styleUrl: './sweet-list.component.css'
})
export class SweetListComponent implements OnInit {
  searchName: string = '';
  searchCategory: string = '';
  sweets: Sweet[] = [];
  filteredSweets!: Sweet[];
  private readonly sweetservice: SweetService = inject(SweetService);

  ngOnInit(): void {
    this.loadSweets();
  }

  loadSweets(): void {
    this.sweetservice.getSweets().subscribe(data => {
      this.sweets = data;
      this.applyFilters();
    });
  }

  onLoadName(name: string): void {
    this.searchName = name;
    this.applyFilters();
  }

  onLoadCategory(category: string): void {
    this.searchCategory = category;
    console.log(this.searchCategory, this.searchName);
    this.applyFilters();
  }
  applyFilters(): void {
    this.sweetservice.getSweets().subscribe(sweets => {
      if (!this.searchName && this.searchCategory === 'tous') {
        this.sweets = sweets;
      } else if(this.searchName && this.searchCategory ==='tous' || this.searchName || this.searchCategory) {
        this.sweets = sweets.filter(sweet => {
          const sweetName = sweet.name ? sweet.name.toUpperCase() : '';
          const sweetCategory = sweet.category ? sweet.category.toUpperCase() : '';
          return sweetName.includes(this.searchName.toUpperCase()) && sweetCategory.includes(this.searchCategory.toUpperCase());
        })
      }
    })
  }
}
