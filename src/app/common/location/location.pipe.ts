import { Pipe, PipeTransform } from '@angular/core';
import { ILocation } from '../../workshops/models/IWorkshop';

@Pipe({
  name: 'location',
  standalone: true,
})
export class LocationPipe implements PipeTransform {
  transform(
    location: ILocation,
    format: 'short' | 'long' = 'long',
    numChars = 80
  ) {
    //return null;
    let locationStr = `${location.address}, ${location.city}, ${location.state}`;
    if (format === 'short') {
      locationStr = locationStr.substring(0, numChars) + '....';
    }
    return locationStr;
  }
}
