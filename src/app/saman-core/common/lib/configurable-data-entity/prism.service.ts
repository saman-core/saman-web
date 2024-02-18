import { Injectable } from '@angular/core';
import Prism from 'prismjs';

@Injectable()
export class PrismService {
  init() {
    Prism.highlightAll();
  }
}
