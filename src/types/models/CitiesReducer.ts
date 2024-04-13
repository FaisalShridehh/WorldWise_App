import { CityType, CurrentCityType } from "./City";

// An enum with all the types of actions to use in our reducer
export enum CitiesActionKind {
  CITIES_lOADED = "cities/loaded",
  CITY_lOADED = "city/loaded",
  CITY_CREATED = "city/created",
  CITY_DELETED = "city/deleted",
  LOADING = "loading",
  REJECTED = "rejected",
}

// An interface for our state
export interface CitiesState {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CurrentCityType;
  error: {
    error_name: string;
    error_message: string;
  };
}

export type CitiesAction =
  | { type: CitiesActionKind.CITIES_lOADED; payload: CityType[] }
  | { type: CitiesActionKind.CITY_lOADED; payload: CurrentCityType }
  | {
      type: CitiesActionKind.CITY_CREATED;
      payload: CityType;
    }
  | {
      type: CitiesActionKind.CITY_DELETED;
      payload: number;
    }
  | { type: CitiesActionKind.LOADING; payload: boolean }
  | {
      type: CitiesActionKind.REJECTED;
      payload: {
        error_name: string;
        error_message: string;
      };
    };

// // An interface for our actions
// export interface CitiesAction {
//   type: CitiesActionKind;
//   payload: Action;
// }
