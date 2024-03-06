import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitTime'
})
export class SplitTimePipe implements PipeTransform {
  transform(value: string): string {
    const [minutes, seconds] = value.split(':');
    return `${minutes}:${seconds}`;
  }
}
