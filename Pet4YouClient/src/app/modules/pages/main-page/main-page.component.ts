import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit, OnDestroy, AfterViewInit {

  destroy = new Subject<any>();

  title = 'Pet4YouClient';

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }
}
