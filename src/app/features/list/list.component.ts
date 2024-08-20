import { Component, Inject, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../shared/interfaces/product.interface';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { NoItemsComponent } from './components/no-items/no-items.component';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule, NoItemsComponent ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {


  products: Product[] = [];

  productsService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog);
  confirmationDialogService = inject(ConfirmationDialogService);

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products
    })
  }

  onEditProdut = (id: string) => {
    this.router.navigateByUrl(`/edit-product/${id}`);
  }

  onDeleteProduct = (product: Product) => {
    const enterAnimationDuration = 0;
    const exitAnimationDuration = 0;

    this.confirmationDialogService.openDialog(product)
      .subscribe(() => {
          this.productsService.delete(product.id).subscribe();
          this.products = this.products.filter(item => item.id !== product.id);
      });

    return true;
  }
}

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Deletar Prudoduto ?</h2>
    <mat-dialog-content>
      você deletará o produto <strong>{{ data.title }}</strong>.
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-flat-button (click)="onCancel()">Cancelar</button>
      <button mat-flat-button color="warn" (click)="onConfirm()">Confirmar</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})

export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
