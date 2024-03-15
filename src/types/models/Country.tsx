export interface Country {
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

export interface CountryListProps {
  cities: Country[];
  isLoading: boolean;
}

export interface Countries {
  country: string;
  emoji: string;
}
export interface CountryItemProps {
  country: Countries;
}
