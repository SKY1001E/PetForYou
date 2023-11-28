import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SelectItem } from 'primeng/api';  // Add this import statement
import { Announcement, AnnouncementFilterModel } from 'src/app/pet4you-v1/shared/others/models/announcement';
import { AnnouncementService } from 'src/app/pet4you-v1/services/api/announcement.service';


@Component({
    selector: 'app-all-announcements-page',
    templateUrl: './all-announcements-page.component.html',
})
export class AllAnnouncementsPageComponent {
    destroy = new Subject<any>();
    isFiltersOpened: boolean = false;
    announcementsList?: Announcement[];

    types: SelectItem[] = [
        { label: 'Choose sorting', value: null, disabled: true },
        { label: 'Newest', value: null }, 
        { label: 'Oldest', value: null },  
        { label: 'Cheapest', value: null }, 
        { label: 'Most expensive', value: null }, 
    ];

    constructor(private router: Router, private route: ActivatedRoute, private announcementService: AnnouncementService) {}

    selectedType: any;

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();
    }

    ngOnInit() {}

    ngAfterViewInit() {}

    receiveDataFromChild(data: AnnouncementFilterModel) {
        console.log(data);
        this.getAnnouncementsWithFilters(data);
    }

    getAnnouncementsWithFilters(data: AnnouncementFilterModel) {
        this.announcementService.getAnnouncementsWithFilters(data)
        .subscribe({
            next: (res) => console.log(res)
        })
    }

    changeFilterOpens() 
    {
        this.isFiltersOpened = !this.isFiltersOpened
    }
}
