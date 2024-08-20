import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Employee } from '../model';
import { mockEmployees } from './employees.mocks';
import { computed, inject } from '@angular/core';
import { produce } from 'immer';
import { LoggerService } from '../logger.service';
import { EmployeesHTTPService } from './employeesHTTP.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

type EmployeeState = {
  _loadedItems: Employee[];
  isLoading: boolean;
  error: Error | null;
  filters: {
    name: string;
    salary: Record<'from' | 'to', number>;
  };
};

const initialState: EmployeeState = {
  _loadedItems: [],
  isLoading: false,
  error: null,
  filters: {
    name: '',
    salary: {
      from: 0,
      to: 10_000,
    },
  },
};

export const EmployeesStore = signalStore(
  // { providedIn: 'root' },
  withState(initialState),
  withComputed(({ _loadedItems, filters }, logger = inject(LoggerService)) => ({
    count: computed(() => {
      return _loadedItems().length;
    }),
    items: computed(() => {
      let result = _loadedItems();

      if (filters.name()) {
        const search = filters.name().toLowerCase();
        result = result.filter((e) => {
          return (
            e.firstName.toLowerCase().includes(search) ||
            e.lastName.toLowerCase().includes(search)
          );
        });
      }

      if (filters.salary.from()) {
        result = result.filter((e) => e.salary >= filters.salary.from());
      }

      if (filters.salary.to()) {
        result = result.filter((e) => e.salary <= filters.salary.to());
      }

      return result;
    }),
  })),
  withMethods((store, logger = inject(LoggerService)) => ({
    updateFiltersName(name: EmployeeState['filters']['name']) {
      patchState(store, (state) => ({
        filters: { ...state.filters, name },
      }));
    },
    updateFiltersSalary(value: Partial<EmployeeState['filters']['salary']>) {
      // patchState(store, (state) => ({
      //   filters: {
      //     ...state.filters,
      //     salary: { ...state.filters.salary, ...value },
      //   },
      // }));
      patchState(store, (state) =>
        produce(state, (draft) => {
          Object.assign(draft.filters.salary, value);
        })
      );
      // check out: ngrx-immer
    },
    clearFilters() {
      logger.logMessage('clear started');
      patchState(
        store,
        (state) => ({ filters: { ...state.filters, name: '' } }),
        (state) => ({
          filters: {
            ...state.filters,
            salary: {
              from: 0,
              to: 10_000,
            },
          },
        })
      );
      logger.logMessage('clear finished');
    },
  })),
  withMethods((store) => ({
    _setLoading() {
      patchState(store, { isLoading: true, error: null, _loadedItems: [] });
    },
    _setError(error: Error) {
      patchState(store, { isLoading: false, error, _loadedItems: [] });
    },
    _setItems(_loadedItems: Employee[]) {
      patchState(store, {
        _loadedItems,
        isLoading: false,
        error: null,
      });
    },
  })),
  withMethods((store, employeesHTTP = inject(EmployeesHTTPService)) => ({
    // all things rxjs
    // IMPERATIVELY: value
    // REACTIVE: signal, stream
    loadEmployees: rxMethod<void>(
      pipe(
        tap(() => store._setLoading()),
        switchMap(() => employeesHTTP.getEmployees()),
        tap({
          next(items) {
            store._setItems(items);
          },
          error(error) {
            store._setError(error);
          },
        }) // items, error
      )
    ),
    async loadEmployees_AA() {
      store._setLoading();
      try {
        const items = await employeesHTTP.fetchEmployees();
        store._setItems(items);
      } catch (err) {
        let error =
          err instanceof Error
            ? err
            : new Error('Unknown Error', { cause: err });
        store._setError(error);
      }
    },
  })),
  withHooks({
    onInit(store) {
      console.log('init');
      store.loadEmployees_AA();
    },
    onDestroy(store) {
      console.log('destroy');
    },
  })
  // withA(),
  // withB(),
  // withC()
);
