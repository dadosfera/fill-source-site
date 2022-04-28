import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayName',
})
export class DisplayNamePipe implements PipeTransform {
  transform(value: string | null | undefined = ''): string {
    if (!value) {
      return '';
    }

    return value.split(' ')[0];
  }
}
