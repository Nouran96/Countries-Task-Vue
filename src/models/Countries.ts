export interface Country {
  name: string;
  population: number;
  numberOfStates: number;
}

export interface CountriesState {
  countries: Array<Country> | [];
  selectedCountry: Country | Record<string, never>;
}
