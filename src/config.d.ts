export interface LoadingConfig {
  API_URL?: string;
  USE_FILTERS?: boolean;
  DISPLAY_PROBABILITIES?: boolean;
  DISPLAY_NAME?: string;
  EXAMPLE_QUESTION?: string;
}

export type Config = Readonly<Required<LoadingConfig>>;
