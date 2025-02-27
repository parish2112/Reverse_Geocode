import { Component, OnInit } from '@angular/core';
import { ReverseGeocodeService } from '../reverse-geocode.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component'; // Import MapComponent

@Component({
  selector: 'app-geocode',
  standalone: true,
  imports: [FormsModule, CommonModule, MapComponent], // Add MapComponent to imports
  templateUrl: './geocode.component.html',
  styleUrl: './geocode.component.scss'
})
export class GeocodeComponent implements OnInit {
  latitude: number | null = null;
  longitude: number | null = null;
  address: string = '';
  loading: boolean = false;

  constructor(private geocodeService: ReverseGeocodeService) { }

  ngOnInit() {
    // Initialization logic can go here if needed.
  }

  onMapClick(coords: { lat: number; lng: number }) {
    this.latitude = coords.lat;
    this.longitude = coords.lng;
    this.getAddress();
  }

  getAddress() {
    if (this.latitude !== null && this.longitude !== null) {
      this.loading = true;
      this.geocodeService.getAddress(this.latitude, this.longitude).subscribe({
        next: (address) => {
          this.address = address;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error getting address:', error);
          this.address = 'Error getting address';
          this.loading = false;
        }
      });
    } else {
      this.address = 'Please enter latitude and longitude';
    }
  }
}