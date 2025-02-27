import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReverseGeocodeService {

  private http = inject(HttpClient);

  getAddress(lat: number, lon: number): Observable<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`; 
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response && response.display_name) {
          return response.display_name;
        } else {
          return 'Address not found';
        }
      })
    );
  }
}