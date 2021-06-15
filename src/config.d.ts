export interface LoadingConfig {
  API_URL?: string;
  FILTERS?: Filters;
  DISPLAY_PROBABILITIES?: boolean;
  TAGNAME?: string;
  DISPLAY_TITLES?: boolean;
  MATOMO_HOST?: string;
  MATOMO_ID?: number;
  DISPLAY_NAME?: string;
  ALLOW_FEEDBACK?: boolean;
  EXAMPLE_QUESTION?: string;
}

interface FilterData {
  id: string;
  type: string;
  name: string;
  data: FilterData[];
}

interface Filters {
  version: string;
  data: FilterData[];
}


export type Config = Readonly<Required<LoadingConfig>>;
