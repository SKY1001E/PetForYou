import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { SelectItem } from 'primeng/api';
@Component({
  selector: 'edit-announcement',
  templateUrl: './edit-announcement.component.html',
})
export class EditAnnouncementComponent implements OnInit, OnDestroy {
    @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined; // Уточнение типа и добавление HTMLInputElement

    destroy = new Subject<any>();

    types: SelectItem[] = [
        { label: 'Chose type', value: null, disabled: true },
        { label: 'Sell', value: null },
        { label: 'Exchange', value: null },
        { label: 'Buy', value: null },
        { label: 'Adoption', value: null },
    ];
    
    selectedType: any;
   
    photoContainers: any[] = Array(6).fill(null);
    uploadedPhotos: string[] = []; 

    ngOnDestroy() {
        this.destroy.next(null);
        this.destroy.complete();

       
    }

    ngOnInit(): void {
      
        this.initForm();
    }

    initForm() {
    }

    openFileInput() {
        if (this.fileInput) {
            const fileInput = this.fileInput.nativeElement;
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

    onDragStart(index: number, event: DragEvent) {
        if (event.dataTransfer) {
            event.dataTransfer.setData('text/plain', index.toString());
        }
    }
    onDragOver(event: DragEvent) { // Уточнение типа для event
        event.preventDefault();
    }

    onDrop(targetIndex: number, event: DragEvent) {
        event.preventDefault();
    
        if (event.dataTransfer) {
            const sourceIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
            const temp = this.uploadedPhotos[sourceIndex];
            this.uploadedPhotos[sourceIndex] = this.uploadedPhotos[targetIndex];
            this.uploadedPhotos[targetIndex] = temp;
        }
    }
}
