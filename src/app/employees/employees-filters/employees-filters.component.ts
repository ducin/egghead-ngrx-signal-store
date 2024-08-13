import { Component, inject } from '@angular/core';
import { EmployeesStore } from '../employee-store';

@Component({
  selector: 'employees-filters',
  standalone: true,
  imports: [],
  templateUrl: './employees-filters.component.html',
  styles: [``],
})
export class EmployeesFiltersComponent {
  store = inject(EmployeesStore);

  updateName(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.store.updateFiltersName(newValue);
  }

  updateSalaryFrom(event: Event) {
    const newValue = parseInt((event.target as HTMLInputElement).value);
    this.store.updateFiltersSalary({ from: newValue });
  }

  updateSalaryTo(event: Event) {
    const newValue = parseInt((event.target as HTMLInputElement).value);
    this.store.updateFiltersSalary({ to: newValue });
  }
}
