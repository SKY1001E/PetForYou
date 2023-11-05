import { Injectable } from '@angular/core';

@Injectable()
export class UIPartsController {

  showHeader: boolean = true;

  get mobileQuery(): boolean {
      return window.innerWidth < 767;
  }

  constructor() {
  }

  storeValue() {
      return { ...this };
  }

  restoreValue(val: UIPartsController) {
      this.showHeader = val.showHeader;
  }
}
