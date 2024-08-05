import { Money } from './shared';

export type Project = {
  "id": string;
  "name": string;
  "budget": Money;
  "startDate": string;
  "endDate": string;
  "team": {
    "id": number;
    "name": string;
  }[];
  "manager": number;
  "description": string;
};
