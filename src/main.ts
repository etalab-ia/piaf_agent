import { loadConfig } from './loadConfig';
import { Config } from './config';

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
  .catch((error) =>
    // eslint-disable-next-line no-console
    console.error('Unable to load configuration file', error),
  );
