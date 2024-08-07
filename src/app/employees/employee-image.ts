import { Component, computed, input, Input } from '@angular/core';

import { Employee } from '../model';
import { apiURL } from '../api.config';

@Component({
  selector: 'employee-image',
  standalone: true,
  template: `<img class="thumb" src="{{ imgSrc() }}" />`,
  styles: [`
    img.thumb {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 5px;
      width: 150px;
    }
    
    img.thumb:hover {
      box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
    }
  `]
})
export class EmployeeImageComponent {
  employee = input.required<Employee>()

  imgSrc = computed(() => `${apiURL}/images/avatars/${this.employee().imgURL}`)
}
