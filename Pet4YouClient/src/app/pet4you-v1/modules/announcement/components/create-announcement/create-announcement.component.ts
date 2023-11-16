// create-announcement.component.ts
import { Component, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { UIPartsController } from '../../../../services/ui-parts-controller.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'create-announcement',
  templateUrl: './create-announcement.component.html',
})
export class CreateAnnouncementComponent implements OnInit, OnDestroy {
    destroy = new Subject<any>();
    private prevUIParts: any;
    @ViewChild('fileInput') fileInput: ElementRef | undefined;
    photoContainers: any[] = Array(6).fill(null); 

  types: SelectItem[] = [
    { label: 'Обрати тип', value: null, disabled: true },
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];
  anotherOptions: SelectItem[] = [
    { label: 'Обрати вид', value: null, disabled: true },
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];
  selectedType: string = ''; 
  selectedAnother: string = '';
  uploadedPhotos: string[] = [];

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private uiParts: UIPartsController
  ) {}

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();

    this.uiParts.restoreValue(this.prevUIParts);
  }

  ngOnInit(): void {
    this.prevUIParts = this.uiParts.storeValue();
  }
}