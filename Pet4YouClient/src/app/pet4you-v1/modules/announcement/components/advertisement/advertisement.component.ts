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
        if(this.announcementData?.type == "free") {
            return "Adoption";
        }

        if(this.announcementData?.type == "search") {
            if(this.announcementData.advertisementInfo?.price == 0)
                return "No reward"
            else
                return "Reward: " + this.announcementData.advertisementInfo?.price
        }

        if(this.announcementData?.advertisementInfo?.price == 0) {
            return "Free";
        }

        return "Price: " + this.announcementData?.advertisementInfo?.price + "₴"
    }

    getCorrectLocation() {
        return this.announcementData != null ?
            this.announcementData?.advertisementLocation?.country + ", " +
            this.announcementData?.advertisementLocation?.region + ", " +
            this.announcementData?.advertisementLocation?.city : ""
    }

    getCorrectDescription() {
        let description = this.announcementData?.description;
        if(description != null) {
            if(description.length > 160) {
                description = description.slice(0, 160) + "..."
            }
            return description;
        }
        return "No description"
    }
}
