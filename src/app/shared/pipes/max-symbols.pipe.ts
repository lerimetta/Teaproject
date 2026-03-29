import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxSymbols'
})
export class MaxSymbolsPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 94) {
      return value.slice(0, 95) + '…';
    }
    return value;
  }

}
