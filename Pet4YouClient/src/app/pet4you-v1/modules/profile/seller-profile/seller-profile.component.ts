import { Component, Input, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/pet4you-v1/services/api/user.service';
import { User } from 'src/app/pet4you-v1/shared/others/models/user-models';
 
@Component({ 
    selector: 'seller-profile', 
    templateUrl: './seller-profile.component.html', 
}) 
export class SellerProfileComponent implements OnInit { 

    isLoading: boolean = true;
    user!: User
    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        var userId: number = this.route.snapshot.params["id"];
        this.userService.getUser(userId).subscribe({
            next: (response) => {
                this.user = response;
                console.log(response);
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

    getReviewsCount() {
        
    }
}