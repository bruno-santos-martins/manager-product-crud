import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ProductsService } from '../../shared/services/products.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ ReactiveFormsModule, MatInputModule,MatButtonModule ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {

  productsService = inject(ProductsService);
  _snackBar = inject(MatSnackBar);
  router = inject(Router);

  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    })
  })

  onSubmit() {
    const title = this.form.controls.title.value;
    this.productsService.post({
      title: title
    })
    .subscribe(() => {
      this.openSnackBar();

    })
  }

  openSnackBar() {
    const snackBarRef = this._snackBar.open('Cadastro Realizado', 'Ok');

    snackBarRef.afterDismissed().subscribe(() => {
      this.form.reset();
      this.router.navigateByUrl('/');
    });

  }
}
