import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { EmployeePageComponent } from './employees/employee-page.component';
import { EmployeeListingComponent } from './employees/employee-listing.component';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeDetailsResolver } from './employees/employee-details.resolver';
import { EmployeesStore } from './employees/employee-store';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'employees',
    component: EmployeePageComponent,
    // providers: [EmployeesStore],
    children: [
      {
        path: ':id',
        component: EmployeeDetailsComponent,
        resolve: {
          employee: EmployeeDetailsResolver,
        },
      },
      {
        path: '',
        component: EmployeeListingComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
