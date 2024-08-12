import { signalStore, withComputed, withState } from '@ngrx/signals';
import { Employee } from '../model';
import { mockEmployees } from './employees.mocks';
import { computed } from '@angular/core';

type EmployeeState = {
  loadedItems: Employee[];
  isLoading: boolean;
  error: Error | null;
  filters: {
    name: string;
    salary: Record<'from' | 'to', number>;
  };
};

const initialState: EmployeeState = {
  loadedItems: mockEmployees,
  isLoading: false,
  error: null,
  filters: {
    name: 'Bert',
    salary: {
      from: 0,
      to: 10_000,
    },
  },
};

export const EmployeesStore = signalStore(
  // { providedIn: 'root' },
  withState(initialState),
  withComputed(({ loadedItems, filters }) => ({
    count: computed(() => {
      return loadedItems().length;
    }),
    items: computed(() => {
      let result = loadedItems();

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
  }))
  // withA(),
  // withB(),
  // withC()
);
