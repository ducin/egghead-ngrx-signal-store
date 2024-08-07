import { Phone } from './shared';

export type Office = {
  "country": string;
  "city": string;
  "address": string;
  "estate": {
    "owner": string;
    "phone": Phone;
    "monthlyRental": number;
  };
  "imgURL": string;
};
