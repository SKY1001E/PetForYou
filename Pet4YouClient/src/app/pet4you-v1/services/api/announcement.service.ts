import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Announcement} from "../../shared/others/models/announcement";
import {Observable} from "rxjs";

@Injectable()
export class AnnouncementService {

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject('API_URL') private apiUrl: string,
        private route: ActivatedRoute
    ) {
    }

    addAnnouncement(announcement: Announcement): Observable<any> {
        return this.http.post(`${this.apiUrl}api/Advertisement/add`, announcement);
    }
}
