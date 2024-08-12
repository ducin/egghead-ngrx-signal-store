import { signalStore, withState } from '@ngrx/signals';
import { Employee } from '../model';
import { mockEmployees } from './employees.mocks';

type EmployeeState = {
  items: Employee[];
  isLoading: boolean;
  error: Error | null;
  filters: {
    name: string;
    salary: Record<'from' | 'to', number>;
  };
};

const initialState: EmployeeState = {
  items: mockEmployees,
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
  withState(initialState)
  // withA(),
  // withB(),
  // withC()
);
