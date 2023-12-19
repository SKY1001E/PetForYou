import { Component, Inject, Input, OnInit } from '@angular/core';
import { AnnouncementService } from 'src/app/pet4you-v1/services/api/announcement.service';
import { Announcement } from 'src/app/pet4you-v1/shared/others/models/announcement';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html'
})
export class AdvertisementComponent implements OnInit {

    @Input()
    announcementData?: Announcement;

    announcementImage?: string;

    constructor(
        @Inject('API_URL') private apiUrl: string,
        private announcementService: AnnouncementService
        )
    {}

    ngOnInit(): void {
        if(this.announcementData?.id != null) {
            this.announcementService.getAnnouncementPicturesURLs(this.announcementData?.id).subscribe({
                next: (response) => {
                    if(response.length != 0)
                        this.announcementImage = this.apiUrl + response[0];
                }
            })
        }
    }

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

    getCorrectImg() {
        if(this.announcementImage == undefined || this.announcementImage == null) {
            return "/assets/image-placeholder.jpg";
        }
        else {
            return this.announcementImage
        }
    }
}
