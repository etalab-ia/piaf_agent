import {Config, LoadingConfig} from './config';
import {clientFromUrl} from "@/client";

const OVERRIDE_CONFIGURATION_FILE = `/override.json`;

export const loadConfig = async (): Promise<Config> => {
  let response: Response;
  const client = clientFromUrl();
  const client_configuration_url = client !== null ? `/clients/${client}.json` : '/configuration.json'
  // Allow to have a local override.json, will be stripped by webpack for production build
  if (process.env.NODE_ENV === 'development') {
    response = await fetch(OVERRIDE_CONFIGURATION_FILE);
    if (!response.ok) {
      response = await fetch(client_configuration_url);
    }
  } else {
    response = await fetch(client_configuration_url);
  }

  const configFromJson: LoadingConfig = await response.json();

  if (!configFromJson?.API_URL) {
    throw new Error('The API_URL parameter is mandatory');
  }
  return {
    DISPLAY_PROBABILITIES: configFromJson.DISPLAY_PROBABILITIES ?? true,
    API_URL: configFromJson.API_URL,
    DISPLAY_NAME: configFromJson.DISPLAY_NAME ?? 'YOU',
    DISPLAY_TITLES: configFromJson.DISPLAY_TITLES ?? true,
    EXAMPLE_QUESTION: configFromJson.EXAMPLE_QUESTION ?? 'Quel est le coût d\'un passeport ?',
    FILTERS: configFromJson.FILTERS ?? {version: "1", data: []}
  };
};
