export interface LoadingConfig {
  API_URL?: string;
  FILTERS?: Filters;
  DISPLAY_PROBABILITIES?: boolean;
  TAGNAME?: string;
  DISPLAY_TITLES?: boolean;
  DISPLAY_NAME?: string;
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
