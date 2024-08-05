import { Component } from '@angular/core';

@Component({
  selector: 'app-employees',
  standalone: true,
  template: `
    <h1>Employees List</h1>
    <ul> @for(employee of employees; track employee.id) {
      <li>{{ employee.name }}</li>
    }</ul>
  `,
  styles: [`
    h1 {
      color: #2c3e50;
    }
  `]
})
export class EmployeesComponent {
  employees = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' }
  ];
}