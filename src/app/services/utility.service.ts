// src/app/services/utility.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  // Method to get an array of star ratings based on the rating number
  getStars(rating: number): number[] {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(i);
    }
    return stars;
  }
}
