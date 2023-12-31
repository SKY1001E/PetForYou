import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/api/user.service";
import {UIPartsController} from "../../services/ui-parts-controller.service";

@Component({
    selector: 'home-page',
    templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit, OnDestroy {
    cities: { value: string; label: string }[] = [
        { value: 'kyiv', label: 'Kyiv' },
        { value: 'lviv', label: 'Lviv' },
        { value: 'odesa', label: 'Odesa' },
        { value: 'kharviv', label: 'Kharkiv' }
      ];
    
      selectedCity: string = '';
    destroy = new Subject<any>();

    private prevUIParts: any;

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
    }

}
