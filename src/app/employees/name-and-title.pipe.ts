import { Pipe, PipeTransform } from '@angular/core';

import { Employee } from '../model';

@Pipe({
  standalone: true,
  name: 'nameAndTitle'
})
export class NameAndTitlePipe implements PipeTransform {
  transform(e: Employee): string {
    return `${ e.firstName } ${ e.lastName }, ${ e.title }`
  }
}
