import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
    selector: 'announcement-view-page',
    templateUrl: './announcement-view-page.component.html',
})
export class AnnouncementViewPageComponent implements OnInit, OnDestroy, AfterViewInit {
    images: any[] = [];
    responsiveOptions: any[] = []; 
    destroy = new Subject<any>();
    selectedNodes: any; 
    nodes: any; 

    constructor(private router: Router, private route: ActivatedRoute) {
        this.images.push({ itemImageSrc: 'assets/announcement1.png' });
        this.images.push({ itemImageSrc: 'assets/announcement2.png' });
      }
      
      onGalleryValueChange(event: any) {
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
