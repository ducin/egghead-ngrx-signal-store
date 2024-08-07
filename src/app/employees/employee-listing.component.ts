import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError, finalize, NEVER, Observable, tap } from 'rxjs';
import { Employee } from '../model';
import { EmployeesHTTPService } from './employeesHTTP.service';
import { NameAndTitlePipe } from './name-and-title.pipe';
import { FlagPipe } from './flag.pipe';
import { LoaderComponent } from '../loader.component';

@Component({
  selector: 'employee-listing',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NameAndTitlePipe,
    FlagPipe,
    LoaderComponent,
],
  // providers: [ EmployeesStore ],
  template: `
@if(isLoading) {
  <loader />
}
@if (employees$ | async; as employees) {
  <div>
    count: {{ employees.length }}
    <ul>
      @for (e of employees; track e) {
        <li>
          {{ e | nameAndTitle }} {{ e | flag }}
          (<a routerLink="/employees/{{ e.id }}" routerLinkActive="active">details</a>)
        </li>
      }
    </ul>
  </div>
}
  `,
  styles: [``]
})
export class EmployeeListingComponent {

  employees$!: Observable<Employee[]>
  #employeeHTTP = inject(EmployeesHTTPService)
  
  isLoading = true
  error: Error | null = null
  
  ngOnInit() {
    this.employees$ = this.#employeeHTTP.getEmployees().pipe(
      tap(() => {
        this.error = null;
        this.isLoading = true;
      }),
      finalize(() => this.isLoading = false),
      catchError((err) => {
        this.error = err;
        return NEVER;
      })
    )
    // this.employees$ = this.employeeHTTP.getEmployees({ nationality: "PL" })
    // this.employees$ = this.employeeHTTP.getEmployees({ office_like: "Poland" })
    // this.employees$ = this.employeeHTTP.getEmployees({ office_like: "Łódź" })
  }
}
