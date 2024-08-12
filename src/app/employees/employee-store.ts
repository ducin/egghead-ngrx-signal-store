import { signalStore, withState } from '@ngrx/signals';
import { Employee } from '../model';

type EmployeeState = {
  items: Employee[];
  filters: {
    name: string;
    salary: Record<'from' | 'to', number>;
  };
};

const initialState: EmployeeState = {
  items: [],
  filters: {
    name: '',
    salary: {
      from: 0,
      to: 10_000,
    },
  },
};

export const EmployeesStore = signalStore(
  withState(initialState)
  // withA(),
  // withB(),
  // withC()
);
