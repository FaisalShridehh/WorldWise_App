import { CityType, CurrentCityType } from "./City";

// An enum with all the types of actions to use in our reducer
export enum CitiesActionKind {
  CITIES_LOADED = "cities/loaded",
  CITY_LOADED = "city/loaded",
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
    error_name: Error["name"];
    error_message: Error["message"];
  };
}

export type CitiesAction =
  | { type: CitiesActionKind.CITIES_LOADED; payload: CityType[] }
  | { type: CitiesActionKind.CITY_LOADED; payload: CurrentCityType }
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
        error_name: Error["name"];
        error_message: Error["message"];
      };
    };
// // An interface for our actions
// export interface CitiesAction {
//   type: CitiesActionKind;
//   payload: Action;
// }
