import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { and } from 'firebase/firestore';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  hours: number[];
  myFormGeneral: FormGroup;
  formDataGeneral: any[] = [];
  
  myFormTiempo: FormGroup;
  formDataTiempo: any[] = [];
  
  myFormOtros: FormGroup;
  formDataOtros: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.hours = Array.from({length: 24}, (_, i) => i);
    
    this.expanded = true, this.expanded2 = true, this.expanded3 = true, this.expanded4 = true, 
    this.myFormGeneral = this.formBuilder.group({
    name: ['', Validators.required], 
    dosis: ['', Validators.required], 
    medida: ['', Validators.required], 
    presen: ['', Validators.required],
    presenForm: ['', Validators.required],
  });
  this.myFormTiempo = this.formBuilder.group({
    selectedHour: ['', Validators.required], 
    inicio: ['', Validators.required], 
    fin: ['', Validators.required], 
  });
  this.myFormOtros = this.formBuilder.group({
    peso: ['', Validators.required], 
    contra: ['', Validators.required], 
    comentario: ['', Validators.required], 
  });
  
  }
    
  ngOnInit() {
  }

  
  submitForm(): void {
    if (this.myFormGeneral.valid  && this.myFormTiempo.valid && this.myFormOtros.valid) {
      this.formDataGeneral.push(this.myFormGeneral.value),
      this.formDataTiempo.push(this.myFormTiempo.value),
      this.formDataOtros.push(this.myFormOtros.value),
      // Reiniciar el formulario
      this.myFormGeneral.reset();
      this.myFormTiempo.reset();
      console.log('Formulario enviado. Datos guardados:', this.formDataGeneral , this.formDataTiempo, this.formDataOtros);
    }
  }
  isFormValidGeneral(): boolean {
    return this.myFormGeneral.valid;
  }
  isFormValidTiempo(): boolean {
    return this.myFormTiempo.valid;
  }
  isFormValidOtros(): boolean {
    return this.myFormOtros.valid;
  }
  
  //userData = {
    //name: "",
    //email: "",
 //}

  expanded: boolean = false;
  expanded2: boolean = false;
  expanded3: boolean = false;
  expanded4: boolean = false;

  toggleCard() {
    this.expanded = !this.expanded;
  }

  toggleCard2() {
    this.expanded2 = !this.expanded2;
  }

  toggleCard3() {
    this.expanded3 = !this.expanded3;
  }

  toggleCard4() {
    this.expanded4 = !this.expanded4;
  }

}
