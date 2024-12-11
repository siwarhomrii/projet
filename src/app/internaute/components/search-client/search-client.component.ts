import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-client',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-client.component.html',
  styleUrl: './search-client.component.css'
})
export class SearchClientComponent {
  searchName: string = "";
  @Output() onClick = new EventEmitter<string>();
  emitNameSearch(): void {
    this.onClick.emit(this.searchName);
}
}
