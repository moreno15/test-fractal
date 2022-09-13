import {Order} from './orders.model';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService{
  baseUrl = environment.baseUrl;

  OrderSubject = new Subject();

  constructor(private http: HttpClient){}


  saveOrder(order: Order): void{


    this.http.post(this.baseUrl + 'orders', order)
      .subscribe(( response) =>{
        this.OrderSubject.next();
      });
  }

  updaterOrder(order: Order,id:number): void{

    this.http.put(this.baseUrl + 'orders/'+id, order)
      .subscribe(( response) =>{
        this.OrderSubject.next();
      });
  }

 deleteOrder(id: number): Observable<any>  {

    return this.http.delete(this.baseUrl + 'orders/'+id);

  }

 OrderListener(): any{
    return this.OrderSubject.asObservable();
  }



  listOrder(page:number, size:number, order:string, asc:boolean ): Observable<any> {

    return this.http.get<any>(this.baseUrl + `orders/pagina?page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }

  getOrder(id:number ): Observable<any> {

    return this.http.get<any>(this.baseUrl + `orders/`+id);
  }


}
