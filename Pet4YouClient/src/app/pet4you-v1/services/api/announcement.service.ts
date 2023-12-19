import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Announcement, AnnouncementFilterModel} from "../../shared/others/models/announcement";
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

    getAnnouncementById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}api/Advertisement/${id}`)
    }

    getAnnouncementsWithFilters(filters: AnnouncementFilterModel) : Observable<any> {
        return this.http.post(`${this.apiUrl}api/Advertisement/filter`, filters);
    }

    getUserAnnouncements(id: number) : Observable<any> {
        return this.http.get(`${this.apiUrl}api/Advertisement/user/id?userId=${id}`);
    }

    uploadImages(formData: FormData, announcementId: number) : Observable<any> {
        return this.http.post(`${this.apiUrl}api/Advertisement/add-pictures/${announcementId}`, formData)
    }

    getAnnouncementPicturesURLs(advertisementId: number) : Observable<any> {
        return this.http.get(`${this.apiUrl}api/Advertisement/pictures/${advertisementId}`)
    }
}
