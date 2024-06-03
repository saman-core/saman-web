import { Injectable } from '@angular/core';
import { GenericResourceRepository } from '@saman-core/data';
import { Formio } from '@formio/angular';
import Prism from 'prismjs';
import CustomComponents from './custom/index';
import { ServiceProvider } from './service-provider';

@Injectable()
export class InitCdeService {
  private _isInitialized = false;

  constructor(
    private _genericResourceRepository: GenericResourceRepository,
  ) {}

  initConf() {
    if (!this._isInitialized) {
      Formio.use(CustomComponents);
      this._isInitialized = true;
      ServiceProvider.genericResourceRepository = this._genericResourceRepository;
    }
  }

  initPrism() {
    Prism.highlightAll();
  }
}
