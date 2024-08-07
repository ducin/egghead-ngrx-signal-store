import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NameAndTitlePipe } from './name-and-title.pipe';
import { FlagPipe } from './flag.pipe';
import { LoaderComponent } from '../loader.component';
import { EmployeesStore } from './employee-store';
import { EmployeeCriteriaComponent } from "./employee-criteria.component";

@Component({
  selector: 'employee-page',
  standalone: true,
  imports: [
    RouterModule,
    // CommonModule,
    // NameAndTitlePipe,
    // FlagPipe,
    // LoaderComponent,
    // EmployeeCriteriaComponent,
],
  // providers: [ EmployeesStore ],
  template: `
<h1>Our Employees</h1>
<router-outlet></router-outlet>
  `,
  styles: [``]
})
export class EmployeePageComponent {
  store = inject(EmployeesStore)
}
