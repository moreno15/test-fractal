import {Client} from './client.model';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService{
  baseUrl = environment.baseUrl;

  ClientSubject = new Subject();

  constructor(private http: HttpClient){}


  saveClient(client: Client): void{


    this.http.post(this.baseUrl + 'clients', client)
      .subscribe(( response) =>{
        this.ClientSubject.next();
      });
  }

  updaterClient(client: Client,id:number): void{

    this.http.put(this.baseUrl + 'clients/'+id, client)
      .subscribe(( response) =>{
        this.ClientSubject.next();
      });
  }

 deleteClient(id: number): Observable<any>  {

    return this.http.delete(this.baseUrl + 'clients/'+id);

  }

 ClientListener(): any{
    return this.ClientSubject.asObservable();
  }



  listClient(page:number, size:number, order:string, asc:boolean ): Observable<any> {

    return this.http.get<any>(this.baseUrl + `clients/pagina?page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }

  listAllClient(): Observable<any> {

    return this.http.get<any>(this.baseUrl + `clients`);
  }
  getClient(id:number ): Observable<any> {

    return this.http.get<any>(this.baseUrl + `clients/`+id);
  }


}
