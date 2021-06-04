import { loadConfig } from './loadConfig';
import { Config } from './config';
import {clientFromUrl} from "@/client";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
    interface Global {
      piafAgentConfig: Config;
    }
  }
}

loadConfig()
  .then(async (config) => {
    // Store config
    global.piafAgentConfig = config;

    // Defer all imports so that global.piafAgentConfig is properly defined when importing
    const application = await import('./app');
    application.init();
  })
  .catch((error) => {
    const client = clientFromUrl();
    if (client === null) {
        if (process.env.NODE_ENV === 'development') {
            document.write('No client found, try: <br /><a href="/dila"/>Dila</a> <br /> Or you can put your configuration file in public/client/yourclient.json and access it via <a href="yourclient">your client</a>')
        } else {
            window.location.href = "https://etalab-ia.github.io/piaf_agent/";
        }
    }
    // eslint-disable-next-line no-console
    console.error('Unable to load configuration file', error)
    },
  );
