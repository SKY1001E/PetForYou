import { Component } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { AnnouncementFilterModel, AnnouncementType, Gender, PetType } from 'src/app/pet4you-v1/shared/others/models/announcement';

@Component({
  selector: 'app-announcement-filters',
  templateUrl: './announcement-filters.component.html'
})
export class AnnouncementFiltersComponent {
    form! : FormGroup;
    advertisementFilters : AnnouncementFilterModel;

    advertisementTypes: SelectItem[] = [
        { label: 'Chose type', value: null, disabled: true },
        { label: 'Sell', value: AnnouncementType.Sale },
        { label: 'Exchange', value: AnnouncementType.Exchange },
        { label: 'Search', value: AnnouncementType.Buy },
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
    
    petGenders: SelectItem[] = [
        { label: 'Chose type', value: null, disabled: true },
        { label: 'Male', value: Gender.Male },
        { label: 'Female', value: Gender.Female },
        { label: 'Unknown', value: Gender.Female },
    ]

    constructor() {
        this.advertisementFilters = {advertisementType: "sell", location:{}}
        this.initForm();
    }

    private initForm() {
        this.form = new FormGroup({
            type: new FormControl(''),
            petType: new FormControl(''),
            country: new FormControl(''),
            region: new FormControl(''),
            city: new FormControl(''),
            breed: new FormControl(''),
            gender: new FormControl(''),
            minAge: new FormControl(''),
            maxAge: new FormControl(''),
            minPrice: new FormControl(''),
            maxPrice: new FormControl(''),
        })
    }
}
