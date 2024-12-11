import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const establishmentLatitude = 36.862499;
const establishmentLongitude = 10.195556;
@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  clientLatitude!: number;
  clientLongitude!: number;
  constructor() {}
  getClientLocation(): Observable<GeolocationCoordinates> {
    return new Observable((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position.coords);
            observer.complete();
          },
          (error) => {
            console.error('Erreur de localisation :', error);
            observer.error(error);
          }
        );
      } else {
        const errorMessage = 'La géolocalisation n’est pas prise en charge par ce navigateur.';
        console.error(errorMessage);
        observer.error(new Error(errorMessage)); 
      }
    });
  }
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  getDistanceToEstablishment(): Observable<number> {
    return this.getClientLocation().pipe(
      map((clientCoords) => {
        return this.calculateDistance(
          clientCoords.latitude,
          clientCoords.longitude,
          establishmentLatitude,
          establishmentLongitude
        );
      }),
      catchError((error) => {
        console.error('Erreur lors du calcul de la distance :', error);
        return of(0); // Retourne 0 en cas d'erreur
      })
    );
  }
}
