import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {delay, map, Subject, switchMap, takeUntil, tap} from 'rxjs';
import {AnnouncementService} from "../../../../services/api/announcement.service";
import {Announcement} from "../../../../shared/others/models/announcement";
import {UserService} from "../../../../services/api/user.service";
import {User} from "../../../../shared/others/models/user-models";
import { MessageService } from 'primeng/api';
import { OrderService } from 'src/app/pet4you-v1/services/api/order.service';
import { OrderRequest } from 'src/app/pet4you-v1/shared/others/models/order-request';

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
    annoncement!: Announcement;
    owner!: User;
    isLoading: boolean = true;
    isContactsVisible: boolean = false;
    isDialogOpened: boolean = false;
    messageToSend: string = "";

    constructor(private router: Router,
                private route: ActivatedRoute,
                private userService: UserService,
                @Inject('API_URL') private apiUrl: string,
                private messageService: MessageService,
                private orderService: OrderService, 
                private announcementService: AnnouncementService) 
    {}

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();
    }

    ngOnInit() {
        this.getAnnouncement();
        
    }

    ngAfterViewInit() {

    }

    private getAnnouncement() {
        const id = this.route.snapshot.params['id'];

        this.announcementService.getAnnouncementById(id)
            .pipe(
                takeUntil(this.destroy),
                tap(() => this.isLoading = true),
                switchMap((announcement: Announcement) => {
                    return this.userService.getUser(announcement.userId)
                        .pipe(
                            map((user) => ({ announcement, user }))
                        );
                })
            )
            .subscribe(({ announcement, user }: { announcement: any, user: any }) => {
                this.annoncement = announcement;
                this.owner = user;
                this.isLoading = false;
            });

        this.getAnnouncementPictures(id);
    }

    private getAnnouncementPictures(id: number) {
        this.announcementService.getAnnouncementPicturesURLs(id).subscribe({
            next: (response) => {
                console.log(response);
                if(response.length != 0) {
                    for (var img of response) {
                        this.images.push({ itemImageSrc: this.apiUrl + img });
                    }
                }
                else {
                    this.images.push({ itemImageSrc: 'assets/image-placeholder.jpg'})
                }
            },
            error: () => {
                this.images.push({ itemImageSrc: 'assets/image-placeholder.jpg'})
            } 
        })
    }

    getCorrectFullName() {
        var result = "";
        result += this.owner.userInfo.firstName != null ? this.owner.userInfo.firstName + " " : '';
        result += this.owner.userInfo.lastName != null ? this.owner.userInfo.lastName + " " : '';
        return result;
    }

    openSendMessage() {
        var currentUserId = this.userService.getUserInfoFromToken().userId;
        if(currentUserId == this.owner.id) {
            this.messageService.add({severity:'error',summary:'Error',detail:'This is your advertisement. You cannot send order to yourself'});
        }
        else {
            this.isDialogOpened = true;
        }
    }

    sendMessage() {
        var orderRequests: OrderRequest = {
            id: 0,
            advertisementId: this.annoncement.id,
            userId: this.userService.getUserInfoFromToken().userId,
            message: this.messageToSend
        }
        this.orderService.addOrderRequest(orderRequests).subscribe({
            next: (response) => {
                this.isDialogOpened = false;
                this.messageService.add({severity:"success",summary:"Success",detail:'Message have succesfully sent'});
            },
            error: (error) => {
                this.messageService.add({severity:"error",summary:"Error",detail:'Error occured while message sending'});
            }
        })
    }
}
