import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 5,
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  // // ? Primera forma de creae un formulario reactivo

  // // * Crear formulario reactivo
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage : new FormControl(0),
  // });

  // ? Segunda forma de crear un formulario reactivo (Esta usa Fernando Herrera)

  public myForm: FormGroup = this.fb.group({
    name:      ['', [ Validators.required,  Validators.minLength(3) ] ],
    price:     [0,  [ Validators.required,  Validators.min(0) ] ],
    inStorage: [0,  [ Validators.required,  Validators.min(0) ] ],
  })

  constructor (private fb: FormBuilder) {}

  ngOnInit(): void {
    //this.myForm.reset(rtx5090)
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError( field: string): string | null {

    // Si no viene el field, lo dejamos nulo
    if (!this.myForm.controls[field] ) return null; 

    // Si no viene regresamos un objeto vacio 
    const errors = this.myForm.controls[field].errors || {};

    // Extraer todas las llaves que vienen en los errors
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Se requieren ${ errors['minlength'].requiredLength } caracteres como mínimo.` ;
      
        default:
          break;
      }
    }

    return null;
  }

  onSave(): void {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
    }

    console.log(this.myForm.value);

    this.myForm.reset({ price: 0, inStorage: 0 });
  }

}
