import { Component, Input } from '@angular/core';
import { Announcement } from 'src/app/pet4you-v1/shared/others/models/announcement';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html'
})
export class AdvertisementComponent {
    @Input()
    announcementData?: Announcement;

    getCorrectPrice() {
        if(this.announcementData?.type == "free" || this.announcementData?.advertisementInfo?.price == 0) {
            return "Adoption";
        }
        if(this.announcementData?.type == "search")
            return "Reward: " + this.announcementData?.advertisementInfo?.price

        return "Price: " + this.announcementData?.advertisementInfo?.price
    }

    getCorrectLocation() {
        return this.announcementData != null ?
            this.announcementData?.advertisementLocation?.country + ", " +
            this.announcementData?.advertisementLocation?.region + ", " +
            this.announcementData?.advertisementLocation?.city : ""
    }
}
