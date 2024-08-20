
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { inject } from '@angular/core';
import { ProductsService } from './shared/services/products.service';
import { firstValueFrom } from 'rxjs';

export const routes: Routes = [{
  path: '',
  component: ListComponent
},{
  path: 'create-product',
  loadComponent: () =>
    import('./features/create-product/create-product.component').then((m) => m.CreateProductComponent),
},{
  path: 'edit-product/:id',
  resolve: {
    product: async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const productsService = inject(ProductsService);
      const id = route.paramMap.get('id') as string;

      return await firstValueFrom(productsService.get(id));
    }
  },
  loadComponent: () =>
    import('./features/edit-product/edit-product.component').then((m) => m.EditProductComponent),
}];
