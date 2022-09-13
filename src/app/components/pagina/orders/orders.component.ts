
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { OrderService } from "./orders.service";
import { Order } from "./orders.model";
import { ModalManager } from "ngb-modal";
import { Router } from "@angular/router";
import { Product } from "../producto/product.model";
import { ProductService } from "../producto/product.service";
import { ClientService } from "../client/client.service";
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  constructor(private ordersService: OrderService, private personalService: ClientService, private productoService: ProductService, private modalService: ModalManager,private router:Router) {}




  @ViewChild("myModal") myModal: any;
  private modalRef: any;

  //list client
  orders: Array<any> | undefined;
  products: Array<any> | undefined;
  clients: Array<any> | undefined;

  detailOrders = Array<any>();
  detalle:any;

  orderSubscription!: Subscription;
  orderRequest!: any;
  id_order!:string;
  order_status!:string;
  name_product!:string;
  name_client!:string;
  product!:any;
  client!:any;



  quantity!:number;
  unit_price!:number;
  cost!:number;

  city_tax:any = 0;;
  country_tax:any = 0;;
  state_tax:any = 0;;
  federal_tax:any = 0;;

  total: any = 0;
  totalTemp: any = 0;
  subTotal: any = 0;
  totalTax: any = 0;




  activar!:string;
  //paginacion
  totalPages: Array<number> | undefined;
  page = 0;
  size = 5;
  order = "id";
  asc = true;

  isFirst = false;
  isLast = false;

  ngOnInit(): void {
    this.listarProducto();
    this.lisratPersonal();
    this.listOrder();
  }


  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }


  saveOrder(form: NgForm) {



      this.orderRequest = {
        id:this.id_order,
        client:this.client,
        order_details:this.detailOrders,
        total:this.total,
        date_order: new Date(),
        status_order:this.order_status,



      }; // enviar post

       if(this.id_order!="null"){
        this.ordersService.updaterOrder(this.orderRequest,parseInt(this.id_order));

       }else{
        this.ordersService.saveOrder(this.orderRequest);
       }

      this.orderSubscription = this.ordersService
        .OrderListener()
        .subscribe(() => {
          this.listOrder();
        });



  }
  deleteOrder(id_order:number):void{
    alert("Order deleted");
    this.ordersService.deleteOrder(id_order);
      this.orderSubscription = this.ordersService
        .OrderListener()
        .subscribe(() => {
          this.listOrder();
        });
  }
  nuevo(form: NgForm):void{
    form.reset();
    this.id_order="null";
    this.activar="1";
  }
  pendingOrder():void{
    this.order_status="Pending";
    alert("Created Order Pending");
  }
  rejectOrder():void{
    this.order_status="Rejected";
    alert("Order Rejected");
  }
  completedOrder():void{
    this.order_status="Completed";

    alert("Order Completed");

  }
  openModal(){
    this.modalRef = this.modalService.open(this.myModal, {
        size: "lg",
        modalClass: 'myModal',
        hideCloseButton: false,
        centered: false,
        backdrop: true,
        animation: true,
        keyboard: false,
        closeOnOutsideClick: true,
        backdropClass: "modal-backdrop"
    })
}

  closeModal() {

    this.modalService.close(this.modalRef);
  }
  editar(order:Order){
    this.order_status=order.status_order;
    this.id_order=order.id;
    this.activar="0";
    this.client=order.client;
    this.detailOrders=order.order_details;
    this.totalTemp=0;

    for (let index = 0; index < order.order_details.length; index++) {
      const detalle = order.order_details[index];

      this.cost=detalle.cost;

      this.totalTemp += parseInt('' + this.cost);


    this.city_tax = this.cost*0.1;
    this.country_tax = this.cost*0.055;
    this.state_tax = this.cost*0.0924;
    this.federal_tax = this.cost*0.0249;



    this.subTotal = this.totalTemp;
    this.totalTax+=this.city_tax+this.country_tax+this.state_tax+this.federal_tax;
    this.total =  this.subTotal+this.city_tax+this.country_tax+this.state_tax+this.federal_tax;

    this.total =parseFloat('' + this.total).toFixed(2);
    }


  }

  listOrder():void {
    this.orderSubscription = this.ordersService
    .listOrder(this.page, this.size, this.order, this.asc)
    .subscribe(
      (data) => {
        this.orders = data.content;
        this.isFirst = data.first;
          this.isLast = data.last;
          this.totalPages = new Array(data.totalPages);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  lisratPersonal() {



    this.orderSubscription =  this.personalService
      .listAllClient()
      .subscribe(
        (data) => {
          this.clients = data;
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  listarProducto():void {
    this.orderSubscription = this.productoService
    .listAllProduct()
    .subscribe(
      (data) => {
        this.products = data;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  selectProduct(id_product:number){

    if(id_product!=null)

    this.orderSubscription = this.productoService
    .getProduct(id_product)
    .subscribe(
      (data) => {
        this.product= data;


      },
      (err) => {
        console.log(err.error);
      }
    );

  }

  selectClient(id_client:number){

    if(id_client!=null)

    this.orderSubscription = this.personalService
    .getClient(id_client)
    .subscribe(
      (data) => {
        this.client= data;


      },
      (err) => {
        console.log(err.error);
      }
    );

  }

  add(){


    this.cost=this.quantity*this.product.price;
    this.unit_price=this.product.price;
    this.totalTemp += parseInt('' + this.cost);


    this.city_tax = this.cost*0.1;
    this.country_tax = this.cost*0.055;
    this.state_tax = this.cost*0.0924;
    this.federal_tax = this.cost*0.0249;

    this.detalle = {
      product: this.product,
      quantity: this.quantity,
      unit_price: parseFloat(  ''+this.unit_price).toFixed(2),
      cost: parseFloat('' + this.cost).toFixed(2),
      city_tax:parseFloat('' + this.city_tax).toFixed(2),
      country_tax: parseFloat('' + this.country_tax).toFixed(2),
      state_tax: parseFloat('' + this.state_tax).toFixed(2),
      federal_tax: parseFloat('' + this.federal_tax).toFixed(2)


    };




    this.detailOrders.push(this.detalle);
    this.subTotal = this.totalTemp;
    this.totalTax+=this.city_tax+this.country_tax+this.state_tax+this.federal_tax;
    this.total =  this.subTotal+this.city_tax+this.country_tax+this.state_tax+this.federal_tax;

    this.total =parseFloat('' + this.total).toFixed(2);

  }



  //eliminamos detalle
  eliminar(index:number):void{
    this.detailOrders.splice(index, 1);

    this.subTotal=0;
    this.totalTax=0;
    this.total =0;
    this.totalTemp=0;
    for (let index = 0; index < this.detailOrders.length; index++) {
      const cost = parseFloat(this.detailOrders[index].cost);

      this.city_tax = this.cost*0.1;
      this.country_tax = this.cost*0.055;
      this.state_tax = this.cost*0.0924;
      this.federal_tax = this.cost*0.0249;

      this.subTotal += cost;
      this.totalTax+=this.city_tax+this.country_tax+this.state_tax+this.federal_tax;
      this.total =  this.subTotal+this.city_tax+this.country_tax+this.state_tax+this.federal_tax;


    }

    this.total =parseFloat('' + this.total).toFixed(2);









  }




  sort(): void {
    this.asc = !this.asc;
    this.lisratPersonal();
  }

  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.lisratPersonal();
    }
  }

  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.lisratPersonal();
    }
  }

  setPage(page: number): void {
    this.page = page;
    this.lisratPersonal();
  }

  setOrder(order: string): void {
    this.order = order;
    this.lisratPersonal();
  }
}
