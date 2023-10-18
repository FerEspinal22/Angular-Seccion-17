import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/services/validators.service';
// import * as CustomValidators from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  

  public myForm: FormGroup = this.fb.group({
    name:            ['', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ]],
    // email:           ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [ new EmailValidator() ]],
    email:           ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [ this.emailValidator ]],
    userName:        ['', [ Validators.required, this.validatorsService.cantBeStrider ]],
    password:        ['', [ Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [ Validators.required, ]],
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator
  ) {}

  isValidField(field: string) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSubmit() {
    // ? disparar que todos los formularios han sido tocados y hacer uso de nuestro id
    this.myForm.markAllAsTouched();
  }

}
