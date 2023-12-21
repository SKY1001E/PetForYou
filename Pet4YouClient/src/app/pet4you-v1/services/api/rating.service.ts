import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Announcement, AnnouncementFilterModel} from "../../shared/others/models/announcement";
import {Observable} from "rxjs";
import { Rating } from "../../shared/others/models/rating";

@Injectable()
export class RatingService {

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject('API_URL') private apiUrl: string,
        private route: ActivatedRoute
    ) 
    {}

    addRating(rating: Rating) : Observable<any> {
        return this.http.post(`${this.apiUrl}api/Rating`, rating);
    }

    getAverageRating(userId: number) : Observable<any> {
        return this.http.get(`${this.apiUrl}api/Rating/average/${userId}`)
    }

    getLatestRatings(userId: number) : Observable<any> {
        return this.http.get(`${this.apiUrl}api/Rating/latest/${userId}`)
    }

}

