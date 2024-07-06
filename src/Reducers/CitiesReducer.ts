import {
  CitiesAction,
  CitiesActionKind,
  CitiesState,
} from "../types/models/CitiesReducer";

export default function CitiesReducer(
  state: CitiesState,
  action: CitiesAction
): CitiesState {
  switch (action.type) {
    case CitiesActionKind.LOADING:
      return { ...state, isLoading: action.payload };
    case CitiesActionKind.REJECTED:
      return { ...state, error: action.payload };

    case CitiesActionKind.CITIES_LOADED:
      return { ...state, isLoading: false, cities: action.payload };
    case CitiesActionKind.CITY_LOADED:
      return { ...state, isLoading: false, currentCity: action.payload };

    case CitiesActionKind.CITY_CREATED:
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case CitiesActionKind.CITY_DELETED:
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    default:
      throw new Error(`Unknown action type: ${(action as CitiesAction).type}`);
  }
}
