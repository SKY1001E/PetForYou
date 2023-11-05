import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UIPartsController} from "../../../services/ui-parts-controller.service";
import {UserService} from "../../../services/api/user.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {

    destroy = new Subject<any>();

    private prevUIParts: any;
    userView: any;
    isLoading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private uiParts: UIPartsController,
        private userService: UserService,
    ) { }

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();

        this.uiParts.restoreValue(this.prevUIParts);
    }

    ngOnInit(): void {
        this.prevUIParts = this.uiParts.storeValue();

        this.userService.getUser()
            .pipe(takeUntil(this.destroy),
                tap(() => this.isLoading = true))
            .subscribe(u => {
                console.log(u)

                if(u?.userView) {
                    this.userView = u.userView
                }

                this.isLoading = false;
            })
    }

}
