import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { EmployeesHTTPService } from './employeesHTTP.service';
import { Employee } from '../model';
import { EmployeesStore } from './employee-store';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsResolver implements Resolve<Employee> {

  #employeeHTTP = inject(EmployeesHTTPService)
  // #store = inject(EmployeesStore)

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id')
    if (!id) {
      throw new Error(':id route parameter required')
    }
    return this.#employeeHTTP.getEmployee(parseInt(id))

    // const id = route.paramMap.get('id')
    // if (!id) {
    //   throw new Error(':id route parameter required')
    // }
    // const item = this.#store.items().find((e) => e.id === parseInt(id))
    // if (!item) {
    //   throw new Error(`Employee with id ${id} not found`)
    // }
    // return item
  }
}
