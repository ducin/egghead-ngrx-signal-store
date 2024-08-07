import { Component, inject, model } from '@angular/core';
import { EmployeesStore } from './employee-store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'employee-criteria',
  standalone: true,
  template: `
<label for="name">
  <input type="text" placeholder="name" id="name"
    [value]="nameFilter()"
    (input)="updateName($event)"
  />
</label>
<!-- <label for="salaryFrom">
  <input type="number" [(ngModel)]="salaryFromFilter" placeholder="salary from" id="salaryFrom" />
</label>
<label for="salaryTo">
  <input type="number" [(ngModel)]="salaryToFilter" placeholder="salary to" id="salaryTo" />
</label> -->
<label for="salaryFrom">
  <input type="number" placeholder="salary from" id="salaryFrom" 
    [value]="store.filters.salary.from()"
    (input)="updateSalaryFrom($event)"
    step="1000"
  />
</label>
<label for="salaryTo">
  <input type="number" placeholder="salary to" id="salaryTo"
    [value]="store.filters.salary.to()"
    (input)="updateSalaryTo($event)"
    step="1000"
  />
</label>
  `,
  styles: [``]
})
export class EmployeeCriteriaComponent {
  nameFilter = model.required<string>()
  // salaryFromFilter = model.required<number>()
  // salaryToFilter = model.required<number>()

  updateName(event: Event){
    this.nameFilter.set((event.target as HTMLInputElement).value);
  }

  updateSalaryFrom(event: Event){
    const value = parseInt((event.target as HTMLInputElement).value);
    this.store.updateFiltersSalary({ from: value });
  }

  updateSalaryTo(event: Event){
    const value = parseInt((event.target as HTMLInputElement).value);
    this.store.updateFiltersSalary({ to: value });
  }

  store = inject(EmployeesStore)
}
