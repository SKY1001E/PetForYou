import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {delay, map, Subject, switchMap, takeUntil, tap} from 'rxjs';
import {AnnouncementService} from "../../../../services/api/announcement.service";
import {Announcement} from "../../../../shared/others/models/announcement";
import {UserService} from "../../../../services/api/user.service";
import {User} from "../../../../shared/others/models/user-models";

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

    constructor(private router: Router,
                private route: ActivatedRoute,
                private userService: UserService,
                @Inject('API_URL') private apiUrl: string,
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

    showContacts() {
        console.log(this.owner)
    }
}
