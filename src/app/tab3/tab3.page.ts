import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  myForm: FormGroup;
  imageSource: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
      phone: ['', Validators.required]
    });
  }
//es para poder agregar la imagen
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
  submitForm(): void {
    if (this.myForm.valid) {
      console.log('Formulario valido xd');
    } else {
      console.log('Formulario teleton');
    }
  }

  isFormValid(): boolean {
    return this.myForm.valid;
  }
}
