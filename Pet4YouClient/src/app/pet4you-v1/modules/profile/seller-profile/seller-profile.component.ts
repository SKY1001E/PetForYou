import { Component, Input, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { RatingService } from 'src/app/pet4you-v1/services/api/rating.service';
import { UserService } from 'src/app/pet4you-v1/services/api/user.service';
import { Rating } from 'src/app/pet4you-v1/shared/others/models/rating';
import { User } from 'src/app/pet4you-v1/shared/others/models/user-models';
 
@Component({ 
    selector: 'seller-profile', 
    templateUrl: './seller-profile.component.html', 
}) 
export class SellerProfileComponent implements OnInit { 

    destroy = new Subject<any>();
    isLoading: boolean = true;
    user!: User
    isCanBeBanned: boolean = false;
    isReviewDialogOpened: boolean = false;
    score: number = 0;
    reviewText: string = "";

    userScope: number = 0;
    latestReviews: Rating[] = [];

    scores = [1,2,3,4,5]

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private confirmationService: ConfirmationService,
        private toastService: MessageService,
        private ratingService: RatingService
    ) {}

    ngOnInit(): void {
        var userId: number = this.route.snapshot.params["id"];
        this.userService.getUser(userId).subscribe({
            next: (response) => {
                this.user = response;
                this.getScore();
                this.getLatestReviews();
                this.userService.isCurrentUserAdmin().then((isAdmin) => {
                    this.isCanBeBanned = isAdmin;
                    this.isLoading = false;
                })
            }
        })
    }

    getCorrectFullName() {
        var result = "";
        result += this.user.userInfo.firstName != null ? this.user.userInfo.firstName + " " : '';
        result += this.user.userInfo.lastName != null ? this.user.userInfo.lastName + " " : '';
        result += this.user.userInfo.patronymicName != null ? this.user.userInfo.patronymicName + " " : '';

        return result;
    }

    onBannedAccount(event: any) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you really want to ban this account?',
            header: 'Banning account',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonStyleClass: "p-button-text",
            accept: () => {
                this.banUser();
            }
        });
    }

    private banUser() {
        this.userService.bannedUser(this.user.id)
            .pipe(
                takeUntil(this.destroy)
            )
            .subscribe(() => {
                this.toastService.add({severity: 'success', summary: 'Success', detail: 'User successfully banned'});
            });
    }

    leaveReview() {
        var rating: Rating = {
            id: 0,
            score: this.score,
            comment: this.reviewText,
            raterUserId: this.userService.getUserInfoFromToken().userId,
            recipientUserId: this.user.id
        }
        this.ratingService.addRating(rating).subscribe({
            next: () => {
                this.toastService.add({severity: 'success', summary:'Success',detail:"You have added an review to this user"})
                this.isReviewDialogOpened = false;
                this.getLatestReviews();
                this.getScore();
            },
            error: (error) => {
                this.toastService.add({severity: 'error', summary:'Error', detail: error.error})
            }
        })
    }

    getLatestReviews() {
        this.ratingService.getLatestRatings(this.user.id).subscribe({
            next: (response) => this.latestReviews = response
        })
    }

    getScore() {
        this.ratingService.getAverageRating(this.user.id).subscribe({
            next: (response) => this.userScope = response
        })
    }

}