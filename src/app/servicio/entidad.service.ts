import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'  
})
export class EntidadServiceff {
  codePdf="";
    pacienteURL = 'http://localhost:8080/api/v1/paciente/buscar?';
    tarifarioURL = 'http://localhost:8080/api/v1/tarifaServicio';
  constructor(private httpClient: HttpClient) { }

  /*public pacientes(page:number, size:number, order:string, asc:boolean,txt:string ): Observable<any> {

    return this.httpClient.get<any>(this.pacienteURL + `filtro=${txt}&page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }
  public tarifarios(): Observable<any> {

    return this.httpClient.get<any>(this.tarifarioURL);
  }*/

 

}