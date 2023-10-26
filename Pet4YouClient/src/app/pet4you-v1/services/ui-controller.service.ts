import { Injectable } from '@angular/core';

@Injectable()
export class UiControllerService {

  showHeader: boolean = true;

  get mobileQuery(): boolean {
      return window.innerWidth < 767;
  }

  constructor() {
  }

}
