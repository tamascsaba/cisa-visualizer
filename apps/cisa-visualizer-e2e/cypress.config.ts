import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run cisa-visualizer:serve:development',
        production: 'nx run cisa-visualizer:serve:production',
      },
      ciWebServerCommand: 'nx run cisa-visualizer:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
