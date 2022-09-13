import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit,OnDestroy {
  estadoUsuario!: boolean;
  usuarioSubscription!: Subscription;

  usuarios:any;
  tipo_user!:string;

  constructor() { }

  ngOnInit(): void {



  }


  ngOnDestroy(){
    this.usuarioSubscription.unsubscribe();
  }

  terminarSesion(){

  }

}
