import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importar el Router para poder navegar a otra página

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {
  myForm: FormGroup;
  imageSource: string | ArrayBuffer | null = null;
  formData: any[] = []; // Arreglo para almacenar los datos del formulario

  constructor(private formBuilder: FormBuilder,private router: Router) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.[a-z])(?=.[A-Z]).{8,}$/)]],
      phone: ['', Validators.required]
    });
  }

  regresar(){
    this.router.navigate(['/tabs/tab4']);
  }

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
      
      this.formData.push(this.myForm.value);

      // Reiniciar el formulario
      this.myForm.reset();


      console.log('Formulario enviado. Datos guardados:', this.formData);
    } 
  }

  isFormValid(): boolean {
    return this.myForm.valid;
  }
}