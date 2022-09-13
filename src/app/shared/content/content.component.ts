import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styles: [
  ]
})
export class ContentComponent implements OnInit {

  constructor(
    private router: Router) { }
  estadoUsuario!: boolean;
  usuarioSubscription!: Subscription;
  ngOnInit(): void {

  }

}
