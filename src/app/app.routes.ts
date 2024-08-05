import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { EmployeeListingComponent } from './employees/employee-listing.component';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeDetailsResolver } from './employees/employee-details.resolver';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employees', component: EmployeeListingComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent, resolve: { employee: EmployeeDetailsResolver } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
