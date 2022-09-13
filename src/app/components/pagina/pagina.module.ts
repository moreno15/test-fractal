import { NgModule ,LOCALE_ID} from '@angular/core';
import { CommonModule ,formatDate,registerLocaleData} from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { ColorVersionRoutingModule } from './pagina-routing.module';
import { ModalModule } from 'ngb-modal';
import {NgxPrintModule} from 'ngx-print';

 //calendar
 import { DemoUtilsModule } from '../demo-utils/module';
import {
  CalendarModule,
  DateAdapter,
  CalendarNativeDateFormatter,
  CalendarDateFormatter,
  DateFormatterParams
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localePR from'@angular/common/locales/es-PR';


import { ProductoComponent } from './producto/product.component';
import { ClientComponent } from './client/client.component';
import { OrdersComponent } from './orders/orders.component';


registerLocaleData(localePR,'es-PR');


@NgModule({
  declarations: [
    ProductoComponent,
    ClientComponent,
    OrdersComponent,

  ],
  providers: [
    {provide:LOCALE_ID,useValue:'es-PR'},

    ],
  imports: [
    CommonModule,
    ColorVersionRoutingModule,
    HttpClientModule,
    ModalModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    DemoUtilsModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: adapterFactory,

      }/* ,
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: PaginaModule,
        }
      }*/

    ),


  ]
})
export class PaginaModule extends CalendarNativeDateFormatter {
  public weekViewHour({ date, locale }: DateFormatterParams): string {

    return new Intl.DateTimeFormat('es-PR', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }
}

