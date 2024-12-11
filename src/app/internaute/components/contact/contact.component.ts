import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavbarComponent,RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
