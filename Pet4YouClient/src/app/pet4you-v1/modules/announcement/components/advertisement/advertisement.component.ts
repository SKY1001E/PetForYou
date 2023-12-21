import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
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

    @Input()
    detailButtonDisplay: boolean = true;

    @Input()
    adminButtonsDisplay: boolean = false;

    @Input()
    selfAnnouncementButtonsDisplay: boolean = false;

    constructor(
        @Inject('API_URL') private apiUrl: string,
        private announcementService: AnnouncementService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router
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
            if(description.length > 130) {
                description = description.slice(0, 130) + "..."
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

    deleteSelfAdvertisement(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you you want to delete this advertisement?',
            header: 'Advertisement deletion',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonStyleClass:"p-button-text",
            accept: () => {
                this.announcementService.deleteAdvertisement(this.announcementData!.id!).subscribe({
                    next: (response) => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have successfully deleted the ad' });
                        window.location.reload()
                    },
                    error: (error) => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary:'Error',detail:'An error occued while deleting the ad'})
                    }
                })
                
            },
        });
    }

    deleteAdvertisementAdmin(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you you want to delete this advertisement as admin?',
            header: 'Advertisement deletion',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonStyleClass:"p-button-text",
            accept: () => {
                this.announcementService.deleteAdvertisement(this.announcementData!.id!).subscribe({
                    next: (response) => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have successfully deleted the ad' });
                        window.location.reload()
                    },
                    error: (error) => {
                        this.messageService.add({severity:'error', summary:'Error',detail:'An error occued while deleting the ad'})
                    }
                })
                
            },
        });
    }
}
