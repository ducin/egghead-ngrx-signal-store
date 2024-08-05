import { Nationality, BenefitServiceType } from './shared'

export type Department = {
  id: number;
  name: string;
}

export type CompanyDef = {
  name: string;
  departments: Department[]
}

type CountryDef = {
  name: string;
  contracts: {
    contract: number;
    permanent: number;
  }
  cities: {
    [city: string]: number[];
  }
  flags: {
    contractorsHaveBenefits: boolean;
  }
};

export type CountryDefMap = {
  [countryCode in Nationality]: CountryDef;
}

export type CountryBenefitsMap = {
  [benefit in BenefitServiceType]: {
    availability: Nationality[];
    monthlyCost: number;
  }
}
