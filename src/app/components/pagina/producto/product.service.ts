import {Product} from './product.model';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  baseUrl = environment.baseUrl;

  ProductSubject = new Subject();

  constructor(private http: HttpClient){}


  saveProduct(product: Product): void{


    this.http.post(this.baseUrl + 'product', product)
      .subscribe(( response) =>{
        this.ProductSubject.next();
      });
  }





  updateProduct(product: Product,id:number): void{

    this.http.put(this.baseUrl + 'product/'+id, product)
      .subscribe(( response) =>{
        this.ProductSubject.next();
      });
  }

  deleteProduct(id: number): void{

    this.http.delete(this.baseUrl + 'product/'+id)
      .subscribe(( response) =>{
        this.ProductSubject.next();
      });
  }

 ProductListener(): any{
    return this.ProductSubject.asObservable();
  }




  listProduct(page:number, size:number, order:string, asc:boolean ): Observable<any> {

    return this.http.get<any>(this.baseUrl + `product/pagina?page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }

  listAllProduct(): Observable<any> {

    return this.http.get<any>(this.baseUrl + `product`);
  }
  getProduct(id:number ): Observable<any> {

    return this.http.get<any>(this.baseUrl + `product/`+id);
  }

}
