import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { apiURL } from '../api.config';

import { Employee, Nationality } from '../model';

export type EmployeeCriteria = {
  nationality?: Nationality
  office_like?: string // for either cities or countries
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesHTTPService {

  #http = inject(HttpClient)

  #createHttpParams(criteria: EmployeeCriteria, page: number, pageSize: number) {
    return new HttpParams({
      fromObject: { ...criteria,
        _limit: pageSize,
        _page: page,
      }
    })
  }

  deleteEmployee(id: Employee['id']) {
    return this.#http.delete(`${apiURL}/employees/${id}`)
  }

  getEmployee(id: Employee['id']) {
    return this.#http.get<Employee>(`${apiURL}/employees/${id}`)
  }

  #getPage(criteria: EmployeeCriteria = {}, page: number = 1, pageSize = 50) {
    return this.#http.get<Employee[]>(`${apiURL}/employees`, {
      params: this.#createHttpParams(criteria, page, pageSize)
    })
  }

  getCount(criteria: EmployeeCriteria = {}) {
    return this.#http.get<number>(`${apiURL}/employees/count`, {
      params: this.#createHttpParams(criteria, 1, 1)
    })
  }

  getEmployees(criteria: EmployeeCriteria = {}) {
    return this.#getPage(criteria)
  }

  async fetchEmployees(criteria: EmployeeCriteria = {}, page: number = 1, pageSize = 50) {
    const query = new URLSearchParams({ ...criteria, 
      _limit: pageSize.toString(),
      _page: page.toString()
    }).toString()
    const response = await fetch(`${apiURL}/employees?${query}`)
    return response.json() as Promise<Employee[]>
  }
}
