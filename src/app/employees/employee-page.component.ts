import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'employee-page',
  standalone: true,
  imports: [
    RouterModule,
  ],
  template: `
<h1>Our Employees</h1>
<router-outlet></router-outlet>
  `,
  styles: [``]
})
export class EmployeePageComponent {
}
