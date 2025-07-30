import { Injectable, inject } from '@angular/core';
import { GenericResourceRepository } from '@saman-core/data';
import { Formio } from '@formio/angular';
import { Templates } from '@formio/js';
import CustomComponents from './custom/index';
import { ServiceProvider } from './service-provider';
import { template } from './template';

@Injectable({
  providedIn: 'root',
})
export class InitCdeService {
  private readonly _genericResourceRepository = inject(GenericResourceRepository);

  initConf() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Formio as any).icons = 'fontawesome';
    Templates.current = template;
    Formio.use(CustomComponents);
    ServiceProvider.genericResourceRepository = this._genericResourceRepository;
  }
}
