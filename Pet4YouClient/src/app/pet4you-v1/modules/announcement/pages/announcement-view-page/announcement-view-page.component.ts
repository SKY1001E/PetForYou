import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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

    constructor(private router: Router,
                private route: ActivatedRoute,
                private userService: UserService,
                private announcementService: AnnouncementService) {
        this.images.push({ itemImageSrc: 'assets/announcement1.png' });
        this.images.push({ itemImageSrc: 'assets/announcement2.png' });
      }

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();
    }

    ngOnInit() {
        this.getAnnouncement()
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
    }

    onGalleryValueChange(event: any) {
        console.log(event)
    }
}
