import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = ( control: FormControl ): ValidationErrors | null => {

    // ? El trim sirve para limpiar la posición adelante y atrás
    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      }
    }

    return null;
  }

  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public isFieldOneEqualFieldTwo( firstField: string, secondField: string) {
    // ? Se va a evaluar mediante una función.
    return ( formGroup: AbstractControl<any, any> ): ValidationErrors | null => {

      const fieldValue1 = formGroup.get( firstField )?.value;
      const fieldValue2 = formGroup.get( secondField )?.value;

      if ( fieldValue1 !== fieldValue2 ) {
        // ? retornar un error
        formGroup.get(secondField)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(secondField)?.setErrors(null);

      return null;
    }
  }

}
