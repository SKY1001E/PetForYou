import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import { jwtDecode } from "jwt-decode";
import {ACCESS_TOKEN_KEY} from "./auth.service";
import {environment} from "../../../../environments/environments";

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient,
        private router: Router,
        @Inject('API_URL') private apiUrl: string,
        private route: ActivatedRoute
    ) {
    }

    getUser(): Observable<any> {
        return this.http.get(`${this.apiUrl}api/User/id/${this.getUserInfoFromToken().userId}`);
    }

    getUserInfoFromToken(): any {
        const jwtToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        const tokenInfo = this.getDecodedAccessToken(jwtToken!);

        return {
            email: tokenInfo.email,
            userId: +tokenInfo.userId
        };
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwtDecode(token);
        } catch (Error) {
            return null;
        }
    }
}
