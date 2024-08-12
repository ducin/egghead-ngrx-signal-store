import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeesStore } from './employee-store';

@Component({
  selector: 'employee-page',
  standalone: true,
  providers: [EmployeesStore],
  imports: [RouterModule],
  template: `
    <h1>Our Employees</h1>
    <router-outlet></router-outlet>
  `,
  styles: [``],
})
export class EmployeePageComponent {}
