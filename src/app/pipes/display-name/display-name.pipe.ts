import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayName',
})
export class DisplayNamePipe implements PipeTransform {
  transform(value: string | null | undefined = ''): string {
    if (!value) {
      return '';
    }

    if (value.length <= 22) {
      return value;
    }

    const truncated = value.substring(0, 22).concat('...');
    return truncated;
  }
}
