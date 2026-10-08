import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withExperimentalAutoCleanupInjectors,
  withExperimentalPlatformNavigation,
} from '@angular/router';

import { routes } from './app.routes';
import { provideCore } from './core/provide-core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withExperimentalAutoCleanupInjectors()),
    provideCore(),
  ],
};
