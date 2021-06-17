export interface LoadingConfig {
  API_URL?: string;
  FILTERS?: Filters;
  DISPLAY_PROBABILITIES?: boolean;
  TAGNAME?: string;
  DISPLAY_TITLES?: boolean;
  MATOMO?: null | MatomoConfig
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

interface MatomoConfig {
  host?: string;
  id?: number;
}

export type Config = Readonly<Required<LoadingConfig>>;
