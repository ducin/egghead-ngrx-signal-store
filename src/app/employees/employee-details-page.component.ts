import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Employee } from '../dto';
import { EmployeeDetailsComponent } from './employee-details.component';

@Component({
  selector: 'employee-details-page',
  standalone: true,
  imports: [
    EmployeeDetailsComponent
  ],
  template: `<employee-details [employee]="employee" />`
})
export class EmployeeDetailsPageComponent {
  employee!: Employee

  #route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.employee = this.#route.snapshot.data['employee']
  }
}
