import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  imageSource: string | ArrayBuffer | null = null;

  displayImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.imageSource = reader.result;
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  constructor() {}

}
