import { Component, Input } from '@angular/core'; 
 
@Component({ 
    selector: 'seller-profile', 
    templateUrl: './seller-profile.component.html', 
}) 
export class SellerProfileComponent { 
  @Input() seller: any;  
}