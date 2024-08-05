import { Nationality, DateString, Money, Phone, Email } from './shared';

export type Skill = string;

export type ContractType = "contract" | "permanent";

export type Employee = {
  "id": number;
  "nationality": Nationality,
  "departmentId": number;
  "keycardId": string;
  "account": string;
  "salary": Money;
  "office": [string, string];
  "firstName": string;
  "lastName": string;
  "title": string;
  "contractType": ContractType;
  "email": Email;
  "hiredAt": DateString;
  "expiresAt": DateString;
  "personalInfo": {
    "age": number;
    "phone": Phone;
    "email": Email;
    "dateOfBirth": DateString;
    "address": {
      "street": string;
      "city": string;
      "country": string;
    };
  },
  "skills": Skill[];
  "bio": string;
  "imgURL": string;
};
