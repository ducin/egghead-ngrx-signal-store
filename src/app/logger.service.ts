import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  logMessage(arg: unknown) {
    console.log(arg);
    // inject(LoggerService)
  }
}
