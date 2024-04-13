import { InjectionToken } from '@angular/core';

export type CdeConfig = {
  baseUrl: string;
  projectUrl: string;
};

export const CDE_CONFIG = new InjectionToken<CdeConfig>('cde.config');
