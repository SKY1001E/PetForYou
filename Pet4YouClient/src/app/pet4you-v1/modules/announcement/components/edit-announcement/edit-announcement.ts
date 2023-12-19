import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageService, SelectItem } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Announcement, AnnouncementType, Gender, PetType } from 'src/app/pet4you-v1/shared/others/models/announcement';
import { AnnouncementService } from 'src/app/pet4you-v1/services/api/announcement.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'edit-announcement',
  templateUrl: './edit-announcement.component.html',
})
export class EditAnnouncementComponent implements OnInit, OnDestroy {

    destroy = new Subject<any>();
    currentAnnouncement!: Announcement;
    isLoading: boolean = true;

    types: SelectItem[] = [
        { label: 'Chose type', value: null, disabled: true },
        { label: 'Sell', value: AnnouncementType.Sell  },
        { label: 'Exchange', value: AnnouncementType.Exchange  },
        { label: 'Buy', value: AnnouncementType.Buy  },
        { label: 'Adoption', value: AnnouncementType.Free },
    ];
    
    petTypes: SelectItem[] = [
        { label: 'Chose type', value: null, disabled: true },
        { label: 'Dog', value: PetType.Dog },
        { label: 'Cat', value: PetType.Cat },
        { label: 'Bird', value: PetType.Bird },
        { label: 'Fish', value: PetType.Fish },
        { label: 'Hamster', value: PetType.Hamster },
        { label: 'Rabbit', value: PetType.Rabbit },
        { label: 'Reptile', value: PetType.Reptile },
        { label: 'Turtle', value: PetType.Turtle },
        { label: 'Other', value: PetType.Other },
    ];

    genders: SelectItem[] = [
        { label: 'Chose type', value: null, disabled: true },
        { label: 'Male', value: Gender.Male },
        { label: 'Female', value: Gender.Female },
        { label: 'Unknown', value: Gender.Female },
    ]

    constructor(
        private announcementService: AnnouncementService, 
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService) 
    {}


    ngOnInit(): void {
        var announcementId: number = this.route.snapshot.params["id"];
        this.announcementService.getAnnouncementById(announcementId).subscribe({
            next: (response) => {
                this.currentAnnouncement = response; 
                console.log(response);
                this.isLoading = false;
            }
        });
    }

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();
    }

    changeData() {
        this.announcementService.changeAnnouncement(this.currentAnnouncement).subscribe({
            next: () => {
                this.messageService.add({severity:'success',summary:'Success',detail:'Announcement sucessfully modified'})
                this.router.navigate(['/announcement', 'my'])
            },
            error: () => {
                this.messageService.add({severity:'error',summary:'Error',detail:'Error during announcement modifying'})
            }
        })
    }

}
