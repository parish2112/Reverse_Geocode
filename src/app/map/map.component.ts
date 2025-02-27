import { Component, OnInit, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  private map: any;
  private marker: any;

  @Output() mapClick = new EventEmitter<{ lat: number; lng: number }>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');
      this.map = L.map('map').setView([28.6139, 77.2090], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.map.on('click', (e: L.LeafletMouseEvent) => {
        this.onMapClick(e);
      });
    }
  }

  onMapClick(e: L.LeafletMouseEvent) {
    if (isPlatformBrowser(this.platformId)){
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      this.updateMarker(lat, lng);
      this.mapClick.emit({ lat, lng });
    }
  }

  async updateMarker(lat: number, lng: number) {
    if (isPlatformBrowser(this.platformId)){
      const L = await import('leaflet');
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker([lat, lng]).addTo(this.map);
    }
  }
}