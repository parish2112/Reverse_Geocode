import { Component } from '@angular/core';
import { GeocodeComponent } from './geocode/geocode.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GeocodeComponent, FormsModule], // Remove RouterOutlet
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reverse-geocode-app';
}