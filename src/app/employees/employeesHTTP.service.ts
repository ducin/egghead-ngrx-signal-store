import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiURL } from '../api.config';

import { Employee, Nationality } from '../dto';

export type EmployeeCriteria = {
  nationality?: Nationality
  office_like?: string // for either cities or countries
}

type Criteria = { [k: string]: number | string }

export const queryString = (criteria: Criteria) =>
  Object.entries(criteria)
    .filter(([key, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

// TODO - REMOVE
export const applyQueryString = (criteria: Criteria) => {
  const query = queryString(criteria)
  return query.length ? '?' + query : ''
}



@Injectable({
  providedIn: 'root'
})
export class EmployeesHTTPService {

  #http = inject(HttpClient)

  deleteEmployee(id: Employee['id']) {
    return this.#http.delete(`${apiURL}/employees/${id}`)
  }

  getEmployee(id: Employee['id']) {
    return this.#http.get<Employee>(`${apiURL}/employees/${id}`)
  }

  getPage(criteria: EmployeeCriteria = {}, page: number = 1, pageSize = 50) {
    const query = applyQueryString({ ...criteria, 
      _limit: pageSize,
      _page: page
    })
    return this.#http.get<Employee[]>(`${apiURL}/employees${query}`)
  }

  getCount(criteria: EmployeeCriteria = {}) {
    const query = applyQueryString(criteria)
    return this.#http.get<number>(`${apiURL}/employees/count${query}`)
  }

  getAllEmployees(criteria: EmployeeCriteria = {}) {
    return this.getPage(criteria)
  }
}
