export interface LoadingConfig {
  API_URL?: string;
  FILTERS?: Filters;
  DISPLAY_PROBABILITIES?: boolean;
  TAGNAME?: string;
  DISPLAY_TITLES?: boolean;
  MATOMO?: null | MatomoConfig
  DISPLAY_NAME?: string;
  DISPLAY_DESCRIPTION?: string;
  ALLOW_FEEDBACK?: boolean;
  EXAMPLE_QUESTION?: string;
  FAQ: Faq;
}

interface Faq {
  version: string;
  data: FaqData[];
}

interface FaqData {
  title: string;
  paragraphs: FaqDataParagraph[];
  link: string | null;
  // theme: string | null;
}

interface FaqDataParagraph {
  context: string;
  // qas: unknown;
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
