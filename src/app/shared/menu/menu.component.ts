import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  usuarios:any;
  nombre_user!:string;
  tipo_user!:string;
  constructor(private router: Router){}

  ngOnInit(): void{


  }


}
