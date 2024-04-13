import { Inject, Injectable } from '@angular/core';
import { Formio } from '@formio/angular';
import Prism from 'prismjs';
import { CDE_CONFIG, CdeConfig } from './cde.config';

@Injectable()
export class InitService {
  private _cdeConfig: CdeConfig;
  private _isInitialized = false;

  constructor(@Inject(CDE_CONFIG) cdeConfig: CdeConfig) {
    this._cdeConfig = cdeConfig;
  }

  initConf() {
    if (!this._isInitialized) {
      Formio.setBaseUrl(this._cdeConfig.baseUrl);
      Formio.setProjectUrl(this._cdeConfig.projectUrl);
      this._isInitialized = true;
    }
  }

  initPrism() {
    Prism.highlightAll();
  }
}
