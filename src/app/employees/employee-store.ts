import { computed, inject } from '@angular/core';
import { signalStore, withHooks, withMethods, withState, patchState, withComputed } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { withDevtools } from '@angular-architects/ngrx-toolkit'

import { Employee } from '../model/employee';
import { EmployeesHTTPService } from './employeesHTTP.service';

type EmployeesState = {
  // items: Employee[];
  _loadedItems: Employee[];
  isLoading: boolean;
  error: Error | null;
  filters: {
    name: string;
    salary: Record<'from' | 'to', number>;
  }
};

const initialState: EmployeesState = {
  // items: [],
  _loadedItems: [],
  isLoading: false,
  error: null,
  filters: {
    name: '',
    // salary: { from: -Infinity, to: +Infinity }
    salary: { from: 0, to: 10_000 }
  },
};

export const EmployeesStore = signalStore(
  // { providedIn: 'root' },
  withDevtools('employees'), // just a name, can be used multiple times
  withState(initialState),
  withComputed(({ _loadedItems, filters }) => ({
    items: computed(() => {
      let result = _loadedItems();
      let a = filters.name()
      let b = filters.salary.from()

      if (filters.name()) {
        result = result.filter((e) => e.firstName.toLowerCase().includes(filters.name().toLowerCase()));
      }

      if (filters.salary.from()) {
        result = result.filter((e) => e.salary >= filters.salary.from());
      }

      if (filters.salary.to()) {
        result = result.filter((e) => e.salary <= filters.salary.to());
      }

      return result;
    })
  })),
  withMethods((store) => ({
    // _ - private, without - public
    _setLoading(){
      patchState(store, (state) => ({ isLoading: true, error: null, _loadedItems: [] }));
    },
    _setError(error: Error){
      patchState(store, (state) => ({ error, isLoading: false, _loadedItems: [] }));
    },
    _setItems(_loadedItems: Employee[]){
      patchState(store, (state) => ({ _loadedItems, isLoading: false, error: null }));
    }
  })),
  withMethods(store => ({
    updateFiltersName(value: EmployeesState['filters']['name']) {
      patchState(store, (state) => ({ filters: { ...state.filters, name: value } }));
    },
    updateFiltersSalary(value: Partial<EmployeesState['filters']['salary']>) {
      patchState(store, (state) => ({ filters: { ...state.filters, salary: { ...state.filters.salary, ...value } }}));
    }
  })),
  withMethods((store, employeeHTTP = inject(EmployeesHTTPService)) => ({
    loadEmployees: rxMethod<void>(
      pipe(
        tap(() => store._setLoading()),
        switchMap(() => employeeHTTP.getEmployees()),
        tap({
          next(items){ store._setItems(items) },
          error(error){ store._setError(error) }
        })
      )
    ),
    async loadEmployees__AA() /*: Promise<void> */ {
      store._setLoading();
      try {
        const items = await employeeHTTP.fetchEmployees();
        store._setItems(items)
      } catch (err) {
        let error = err instanceof Error
          ? err
          : new Error('Unknown error', { cause: err });
        store._setError(error)
      }
    },
  })),
  withHooks({
    onInit(store) {
      store.loadEmployees();
    },
  })
);
