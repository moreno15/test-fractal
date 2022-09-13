import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "./product.service";

import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { Product } from "./product.model";

import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-producto",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductoComponent implements OnInit, OnDestroy {
  constructor(
    private productoService: ProductService,
    private http: HttpClient,
    private router:Router
  ) {}

  productoSubscription!: Subscription;
  productos!: Array<any>; //listar

  productoRequest!: any;
  // producto

  //medicamento
  id!: string;
  nombreproducto!: string;
  estado!: boolean;
  stock!: number;
  precio_costo!: number;
  namecategoria!: any;



  id_producto!: string;
  activar!: string;

  totalPages: Array<number> | undefined;
  page = 0;
  size = 5;
  order = "id";
  asc = false;

  isFirst = false;
  isLast = false;


  ngOnInit(): void {


    this.listarProducto();
    this.id_producto = "null";
    this.activar = "1";
  }
  ngOnDestroy(): void {
    this.productoSubscription.unsubscribe();

  }
  nuevo(): void {
    this.id_producto = "null";
    this.activar = "1";

  }

  guardarProducto(form: NgForm) {
    if (form.valid) {
      this.productoRequest = {
        id:this.id_producto,

        name: this.nombreproducto,
        price: parseFloat(""+this.precio_costo).toFixed(2),
        stock: parseInt(""+this.stock),
        category: this.namecategoria,
        state: true,


      }; // enviar post


       if(this.id_producto!="null"){
        this.productoService.updateProduct(this.productoRequest,parseInt(this.id_producto));
       }else{
        this.productoService.saveProduct(this.productoRequest);
       }

      this.productoSubscription = this.productoService
        .ProductListener()
        .subscribe(() => {
          this.listarProducto();
        });
    }
  }
  updateproducto(producto: Product): void {
    this.activar = "0";
    this.id_producto=producto.id;

    this.nombreproducto = producto.name;
    this.precio_costo = producto.price;
    this.stock = producto.stock;
    this.namecategoria = producto.category;
    this.estado = producto.state;

  }


  deleteProducto(prod:Product){

      this.id_producto="null";

      if(!prod.state){
        prod.state=true;
      }else{
        prod.state=false;
      }

      this.productoService.updateProduct(prod,parseInt(prod.id));
      this.productoSubscription = this.productoService.ProductListener().subscribe(() => {

        this.listarProducto() ;

      });

  }

  listarProducto():void {
    this.productoSubscription = this.productoService
    .listProduct(
      this.page,
      this.size,
      this.order,
      this.asc
    )
    .subscribe(
      (data) => {
        this.productos = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = new Array(data.totalPages);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  sort(): void {
    this.asc = !this.asc;
    this.listarProducto();
  }

  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.listarProducto();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.listarProducto();
    }

  }

  setPage(page: number): void {
    this.page = page;
    this.listarProducto();
  }

  setOrder(order: string): void {
    this.order = order;
    this.listarProducto();
  }
}
