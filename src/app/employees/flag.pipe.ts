import { Pipe, PipeTransform } from '@angular/core';

import { Employee } from '../model';

const flags = {
  US: "🇺🇸",
  UK: "🇬🇧",
  DE: "🇩🇪",
  FR: "🇫🇷",
  NL: "🇳🇱",
  PL: "🇵🇱",
  IT: "🇮🇹",
  ES: "🇪🇸"
}

@Pipe({
  standalone: true,
  name: 'flag'
})
export class FlagPipe implements PipeTransform {
  transform(e: Employee): string {
    return flags[e.nationality]
  }
}
