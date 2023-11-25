// create-announcement.component.ts
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {UIPartsController} from '../../../../services/ui-parts-controller.service';
import {SelectItem} from 'primeng/api';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Announcement, AnnouncementType, Gender, PetType} from "../../../../shared/others/models/announcement";
import {AnnouncementService} from "../../../../services/api/announcement.service";
import {UserService} from "../../../../services/api/user.service";

@Component({
  selector: 'create-announcement',
  templateUrl: './create-announcement.component.html',
})
export class CreateAnnouncementComponent implements OnInit, OnDestroy {

    @ViewChild('fileInput') fileInput: ElementRef | undefined;

    destroy = new Subject<any>();

    private prevUIParts: any;

    photoContainers: any[] = Array(6).fill(null);

    types: SelectItem[] = [
        { label: 'Обрати тип', value: null, disabled: true },
        { label: 'Продаж', value: AnnouncementType.Sale },
        { label: 'Обмін', value: AnnouncementType.Swap },
        { label: 'Купівля', value: AnnouncementType.Buy },
    ];
    anotherOptions: SelectItem[] = [
        { label: 'Обрати вид', value: null, disabled: true },
        { label: 'Собака', value: PetType.Dog },
        { label: 'Кіт', value: PetType.Cat },
    ];
    genders: SelectItem[] = [
        { label: 'Обрати вид', value: null, disabled: true },
        { label: 'Самець', value: Gender.Male },
        { label: 'Самка', value: Gender.Female },
    ]
    selectedType: any;
    selectedAnother: any;
    selectedGender: any;
    uploadedPhotos: string[] = [];

    form!: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private uiParts: UIPartsController,
        private announcementService: AnnouncementService,
        private userService: UserService
        ) {}

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();

        this.uiParts.restoreValue(this.prevUIParts);
    }

    ngOnInit(): void {
        this.prevUIParts = this.uiParts.storeValue();

        this.initForm()
    }

    private initForm() {
        this.form = new FormGroup({
            title: new FormControl('', [Validators.required]),
            type: new FormControl(''),
            petType: new FormControl(''),
            description: new FormControl('', [Validators.required]),
            country: new FormControl(''),
            region: new FormControl(''),
            city: new FormControl(''),
            breed: new FormControl(''),
            gender: new FormControl(''),
            age: new FormControl(''),
            price: new FormControl(''),
        })
    }

    openFileInput() {
        if (this.fileInput) {
            const fileInput = this.fileInput.nativeElement as HTMLInputElement;
            fileInput.click();
        }
    }
    displayImage(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const photoPath = e.target?.result as string;
                this.uploadedPhotos.push(photoPath);
            };

            reader.readAsDataURL(file);
        }
    }
    onDragStart(index: number, event: any) {
        event.dataTransfer.setData('text/plain', index.toString());
    }

    onDragOver(event: any) {
        event.preventDefault();
    }

    onDrop(targetIndex: number, event: any) {
        event.preventDefault();
        const sourceIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
        const temp = this.uploadedPhotos[sourceIndex];
        this.uploadedPhotos[sourceIndex] = this.uploadedPhotos[targetIndex];
        this.uploadedPhotos[targetIndex] = temp;
    }

    publicAnnouncement(event: any) {
        if (this.form.invalid) {
            return;
        }

        const announcement: Announcement = {
            title: this.form.value?.title,
            type: this.selectedType?.value
                ? this.selectedType.value
                : null,
            description: this.form.value?.description
                ? this.form.value?.description
                : null,
            petType: this.selectedAnother?.value
                ? this.selectedAnother?.value
                : null,
            publicationDate: new Date(),
            userId: this.userService.getUserInfoFromToken().userId,
            completed: false,
            advertisementLocation: {
                country: this.form.value?.country
                    ? this.form.value?.country
                    : null,
                city: this.form.value?.city
                    ? this.form.value?.city
                    : null,
                region: this.form.value?.region
                    ? this.form.value?.region
                    : null
            },
            advertisementInfo: {
                breed: this.form.value?.breed
                    ? this.form.value?.breed
                    : null,
                age: this.form.value?.age
                    ? this.form.value?.age
                    : null,
                price: this.form.value?.price
                    ? this.form.value?.price
                    : null,
                gender: this.selectedGender?.value
                    ? this.selectedGender?.value
                    : null,
            }
        }

        this.announcementService.addAnnouncement(announcement)
            .pipe(takeUntil(this.destroy))
            .subscribe(w => {
                console.log(w);
            })
    }
}
