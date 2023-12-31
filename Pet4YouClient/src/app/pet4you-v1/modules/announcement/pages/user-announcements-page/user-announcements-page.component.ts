import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { Announcement, AnnouncementFilterModel } from 'src/app/pet4you-v1/shared/others/models/announcement';
import { AnnouncementService } from 'src/app/pet4you-v1/services/api/announcement.service';
import { UserService } from 'src/app/pet4you-v1/services/api/user.service';

@Component({
  selector: 'app-user-announcements-page',
  templateUrl: './user-announcements-page.component.html'
})
export class UserAnnouncementsPageComponent {
    destroy = new Subject<any>();
    types: SelectItem[] = [
      { label: 'Chose type', value: null, disabled: true },
      { label: 'Sell', value: null },
      { label: 'Exchange', value: null },
      { label: 'Buy', value: null },
    ];
    anotherOptions: SelectItem[] = [
        { label: 'Chose type', value: null, disabled: true },
        { label: 'Dog', value: null},
        { label: 'Cat', value: null},
        { label: 'Bird', value: null },
        { label: 'Fish', value: null },
        { label: 'Hamster', value: null },
        { label: 'Rabbit', value: null },
        { label: 'Reptile', value: null },
        { label: 'Turtle', value: null },
        { label: 'Other', value: null },
    ];

    constructor(private announcementService: AnnouncementService, private userService: UserService) {}

    userAdvertisements?: Announcement[];
    advertisemenetsFilter?: AnnouncementFilterModel;

    selectedType: any;
    selectedAnother: any;
    
    ngOnInit() {
        let userId = this.userService.getUserInfoFromToken().userId;
        this.announcementService.getUserAnnouncements(userId)
        .subscribe({
            next: (response) => this.userAdvertisements = response
        })
    }

    ngAfterViewInit() {}
}
