import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SelectItem } from 'primeng/api';  // Add this import statement

@Component({
  selector: 'app-all-announcements-page',
  templateUrl: './all-announcements-page.component.html',
})
export class AllAnnouncementsPageComponent {
  destroy = new Subject<any>();
  selectedNodes: any;
  nodes: any;
  

  types: SelectItem[] = [
    { label: 'Choose sorting', value: null, disabled: true },
    { label: 'Newest', value: null }, 
    { label: 'Oldest', value: null },  
    { label: 'Cheapest', value: null }, 
    { label: 'Most expensive', value: null }, 
];

  constructor(private router: Router, private route: ActivatedRoute) {}

  selectedType: any;

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  ngOnInit() {}

  ngAfterViewInit() {}
}
