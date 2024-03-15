export interface CityType {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
}

export interface CityListProps {
  cities: CityType[];
  isLoading: boolean;
}
export interface CityItemProps {
  city: CityType;
}

export interface CurrentCityType {
  id?: number;
  cityName?: string;
  emoji?: string;
  date?: string;
  notes?: string;
  country?: string;
  position?: {
    lat: number;
    lng: number;
  };
}
