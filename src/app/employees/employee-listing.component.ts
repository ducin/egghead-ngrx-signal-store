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
    @if(store.isLoading()) {
    <loader />
    } @if (store.items(); as employees) {
    <div>
      count: {{ employees.length }}
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
