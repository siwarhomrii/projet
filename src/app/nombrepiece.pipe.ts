import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombrepiece',
  standalone: true
})
export class NombrepiecePipe implements PipeTransform {
  transform(weight:number): string {
    let nbr = Math.floor(1000 / weight);
    nbr-=(nbr%5);
    return nbr.toString()+"pièces/1kg";
  }

}
