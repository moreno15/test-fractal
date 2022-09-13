import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ProductoComponent } from './producto/product.component';
import { OrdersComponent } from './orders/orders.component';
const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'client',
        component: ClientComponent,

      },

      {
        path: 'product',
        component: ProductoComponent,

      },

      {
        path: 'orders',
        component: OrdersComponent,

      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule],
})
export class ColorVersionRoutingModule { }
