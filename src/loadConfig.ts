import {Config, LoadingConfig} from './config';
import {clientFromUrl} from "@/client";

export const loadConfig = async (): Promise<Config> => {
  let response: Response | null = null;

  const client = clientFromUrl();
  if (client === null) {
    throw new Error('No client');
  } else {
    response = await fetch(`/clients/${client}.json`);
  }

  const configFromJson: LoadingConfig = await response.json();

  if (!configFromJson?.API_URL) {
    throw new Error('The API_URL parameter is mandatory');
  }

  return {
    DISPLAY_PROBABILITIES: configFromJson.DISPLAY_PROBABILITIES ?? true,
    TAGNAME: configFromJson.TAGNAME ?? '',
    API_URL: configFromJson.API_URL,
    DISPLAY_NAME: configFromJson.DISPLAY_NAME ?? 'YOU',
    DISPLAY_TITLES: configFromJson.DISPLAY_TITLES ?? true,
    EXAMPLE_QUESTION: configFromJson.EXAMPLE_QUESTION ?? 'Quel est le coût d\'un passeport ?',
    FILTERS: configFromJson.FILTERS ?? {version: "1", data: []}
  };
};
