import { InjectionToken } from '@angular/core';

export type DataConfType = {
  [name: string]: string;
};

export const DATA_CONFIG = new InjectionToken<DataConfType>('data.config');
