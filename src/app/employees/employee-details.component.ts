import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Employee } from '../model';
import { EmployeeImageComponent } from './employee-image';
import { LoaderComponent } from '../loader.component';

@Component({
  selector: 'employee-details',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeImageComponent,
    LoaderComponent,
  ],
  template: `
@if (employee(); as employee){
<h2>{{ employee.firstName }} {{ employee.lastName }} (age: {{ employee.personalInfo.age }})</h2>

<employee-image [employee]="employee" />

<div>
  {{ employee.title }},
  earning {{ employee.salary | currency:"EUR" }},
  hired: {{ employee.hiredAt | date }}

  <div>
    office: {{ employee.office.join(', ') }}
  </div>

  <h3>Skills</h3>
  <ul>
    @for (skill of employee.skills; track skill) {
      <li>{{ skill }}</li>
    }
  </ul>

  <a href="mailto:{{ employee.personalInfo.email }}"></a>
</div>
} @else {
  <loader />
}
  `,
  styles: [``]
})
export class EmployeeDetailsComponent {
  employee = input<Employee>()
}
