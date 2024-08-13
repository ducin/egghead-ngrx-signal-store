import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NameAndTitlePipe } from './name-and-title.pipe';
import { FlagPipe } from './flag.pipe';
import { LoaderComponent } from '../loader.component';
import { EmployeesStore } from './employee-store';

@Component({
  selector: 'employee-listing',
  standalone: true,
  imports: [
    RouterModule,
    // CommonModule,
    JsonPipe,
    NameAndTitlePipe,
    FlagPipe,
    LoaderComponent,
  ],
  template: `
    <!-- {{ store.filters() | json }} -->
    <!-- {{ store.filters.name() | json }} -->
    <!-- {{ store.filters.salary().from | json }} -->
    <!-- {{ store.filters.salary.from() | json }} -->
    <label for="name">
      <input
        type="text"
        placeholder="name"
        id="name"
        [value]="store.filters.name()"
        (input)="updateName($event)"
      />
    </label>

    <label for="salaryFrom">
      <input
        type="number"
        placeholder="salary from"
        id="salaryFrom"
        [value]="store.filters.salary.from()"
        (input)="updateSalaryFrom($event)"
        step="1000"
      />
    </label>

    <label for="salaryTo">
      <input
        type="number"
        placeholder="salary to"
        id="salaryTo"
        [value]="store.filters.salary.to()"
        (input)="updateSalaryTo($event)"
        step="1000"
      />
    </label>

    <button (click)="store.clearFilters()">clear filters</button>

    @if(store.isLoading()) {
    <loader />
    } @if (store.items(); as employees) {
    <div>
      count: {{ store.count() }}
      <ul>
        @for (e of employees; track e) {
        <li>
          {{ e | nameAndTitle }} {{ e | flag }} (<a
            routerLink="/employees/{{ e.id }}"
            routerLinkActive="active"
            >details</a
          >)
        </li>
        }
      </ul>
    </div>
    }
  `,
  styles: [``],
})
export class EmployeeListingComponent {
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

  // employees$!: Observable<Employee[]>;
  // #employeeHTTP = inject(EmployeesHTTPService);

  // isLoading = true;
  // error: Error | null = null;

  // ngOnInit() {
  //   this.employees$ = this.#employeeHTTP.getEmployees().pipe(
  //     tap(() => {
  //       this.error = null;
  //       this.isLoading = true;
  //     }),
  //     finalize(() => (this.isLoading = false)),
  //     catchError((err) => {
  //       this.error = err;
  //       return NEVER;
  //     })
  //   );
  // }
}
