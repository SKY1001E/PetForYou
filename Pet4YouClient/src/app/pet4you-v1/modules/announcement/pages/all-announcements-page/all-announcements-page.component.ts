import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MessageService, SelectItem } from 'primeng/api';
import { Announcement, AnnouncementFilterModel, SortType } from 'src/app/pet4you-v1/shared/others/models/announcement';
import { AnnouncementService } from 'src/app/pet4you-v1/services/api/announcement.service';


@Component({
    selector: 'app-all-announcements-page',
    templateUrl: './all-announcements-page.component.html',
})
export class AllAnnouncementsPageComponent {

    selectedSorting?: SortType; 
    destroy = new Subject<any>();
    isFiltersOpened: boolean = false;
    announcementsList?: Announcement[];
    currentSearchQuery: string = "";

    sortTypesItems: SelectItem[] = [
        { label: 'Date (newest)', value: SortType.DateDesc },
        { label: 'Date (oldest)', value: SortType.DateAsc }, 
        { label: 'Price (asc)', value: SortType.PriceAsc },  
        { label: 'Price (desc)', value: SortType.PriceDesc }
    ];
    constructor(private router: Router, 
        private route: ActivatedRoute, 
        private announcementService: AnnouncementService, 
        private toastService: MessageService) {}

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();
    }

    ngOnInit() {
        this.announcementService.getAnnouncementsWithFilters({advertisementType: "sell", location: {}})
        .subscribe({
            next: (res) => this.announcementsList = res,
            error: () => this.toastService.add({severity:'error', summary:'Error',detail:'Error occured during trying to get advertisements'})
        })
    }

    ngAfterViewInit() {}

    receiveDataFromChild(data: AnnouncementFilterModel) {
        this.getAnnouncementsWithFilters(data);
    }

    getAnnouncementsWithFilters(data: AnnouncementFilterModel) {
        this.announcementService.getAnnouncementsWithFilters(data)
        .subscribe({
            next: (res) => {
                this.announcementsList = res;
                this.sortAdvertisements();
            },
            error: () => this.toastService.add({severity:'error', summary:'Error',detail:'Error occured during trying to get advertisements'})
        })
    }

    getAnnouncementBySearch() {
        console.log(this.currentSearchQuery);
        this.announcementService.getAdvertisementsBySearch(this.currentSearchQuery).subscribe({
            next: (res) => {
                this.announcementsList = res;
                this.sortAdvertisements();
            }
        })
    }

    changeFilterOpens() 
    {
        this.isFiltersOpened = !this.isFiltersOpened
    }

    sortAdvertisements()
    {
        if(this.selectedSorting != undefined && this.announcementsList != undefined && this.announcementsList.length != 0) {
            if(this.selectedSorting == SortType.DateDesc) {
                this.announcementsList?.sort((a, b) => {
                    const dateA = new Date(a.publicationDate!);
                    const dateB = new Date(b.publicationDate!);
                    return dateB.getTime() - dateA.getTime();
                })
            }
            else if(this.selectedSorting == SortType.DateAsc) {
                this.announcementsList?.sort((a, b) => {
                    const dateA = new Date(a.publicationDate!);
                    const dateB = new Date(b.publicationDate!);
                    return dateA.getTime() - dateB.getTime();
                })
            }
            else if(this.selectedSorting == SortType.PriceAsc) {
                this.announcementsList?.sort((a, b) => {
                    return a.advertisementInfo!.price! - b.advertisementInfo!.price!
                })
            }
            else if(this.selectedSorting == SortType.PriceDesc) {
                this.announcementsList?.sort((a, b) => {
                    return b.advertisementInfo!.price! - a.advertisementInfo!.price!
                })
            }
        }
    }
}
