import { Money, DateString } from './shared';

export type Expense = {
  "id": string;
  "amount": Money;
  "title": string;
  "payerAccount": string;
  "beneficiaryAccount": string;
  "beneficiaryAddress": string;
  "scheduledAt": DateString;
};
