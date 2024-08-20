import { Product } from './../../shared/interfaces/product.interface';
import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ FormComponent ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  product: Product = inject(ActivatedRoute).snapshot.data['product'];

  productsService = inject(ProductsService);
  _snackBar = inject(MatSnackBar);
  router = inject(Router);


  onSubmit(product: Product) {
    const id = this.product.id;
    console.log(product);
    this.productsService.put(id,product)
    .subscribe(() => {
      this.openSnackBar();
    })
  }

  openSnackBar() {
    const snackBarRef = this._snackBar.open('Atualização Realizada', 'Ok');

    snackBarRef.afterDismissed().subscribe(() => {
      this.router.navigateByUrl('/');
    });

  }

}
