import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SweetListComponent } from "./internaute/components/sweet-list/sweet-list.component";
import { NavbarComponent } from "./internaute/components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SweetListComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projet';
}
