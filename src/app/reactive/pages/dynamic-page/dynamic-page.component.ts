import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      ['Super Smash Bros.', Validators.required ],
      ['Call of Duty', Validators.required ],
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required );

  constructor(private fb: FormBuilder) {}

  // ! favorite games
  get favoriteGames() {
    // ? Con el FormArray le decimos a Angular que lo interprete como un arreglo ya que podría ser cualquier cosa
    return this.myForm.get('favoriteGames') as FormArray;
  }
  // ! isValidField
  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }
  // ! isValidFieldInArray
  isValidFieldInArray( formArray: FormArray, index: number) {
    return formArray.controls[index].errors && this.myForm.controls[index].touched;
  }
  // ! igetFieldError
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
  // ! onAddToFavorites
  onAddToFavorites():void {
    if( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;

    //this.favoriteGames.push( new FormControl( newGame, Validators.required )  )
    // ? Agregar el nuevo favorito al arreglo
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset();
  }
  // ! onDeleteFavorite
  onDeleteFavorite(index: number):void {
    this.favoriteGames.removeAt(index);
  }

  // ! onSubmit
  onSubmit():void {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log( this.myForm.value );
    // ? Se pone as FormArray porque no sabe que es un arreglo.
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }
}
