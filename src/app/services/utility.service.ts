// src/app/services/utility.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0); // Fill an array with the number of stars based on the rating
  }
  floorval(val: number): number {
    return Math.floor(val);
  }
}
