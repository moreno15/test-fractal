import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { ClientService } from "./client.service";
import { Client } from "./client.model";
import { ModalManager } from "ngb-modal";
import { Router } from "@angular/router";
@Component({
  selector: 'app-personal',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit  {

  @ViewChild("myModal") myModal: any;
  private modalRef: any;

  //list client
  Client: Array<any> | undefined;
  clientSubscription!: Subscription;

  //atributos de client
  ClientRequest!: any;

  nombre!: string;
  tipo_documento!: string;
  num_documento!: string;
  id_personal!:string;

  activar!:string;
  //paginacion
  totalPages: Array<number> | undefined;
  page = 0;
  size = 5;
  order = "id";
  asc = true;

  isFirst = false;
  isLast = false;

  constructor(private personalService: ClientService, private modalService: ModalManager,private router:Router) {}


  ngOnInit(): void {

      this.lisratPersonal() ;


  }

  ngOnDestroy(): void {
    this.clientSubscription.unsubscribe();
  }

  saveClient(form: NgForm) {


    if(this.id_personal!="null"){
      if(form.value.nombre.trim()==""||

      form.value.tipo_documento.trim()=="" ||
      form.value.num_documento.trim()==""){

       alert("complete campos con *");
       return;
      }
    }else{


      if(!form.value.nombre&&
        !form.value.tipo_documento&&
        !form.value.num_documento ){

        alert("complete campos con *");
        return;
       }
    }


      this.ClientRequest={
        id:this.id_personal,
        name_client: this.nombre,
        type_document: this.tipo_documento,
        number_document: this.num_documento,


      };// enviar post
      if(this.id_personal!="null"){
        this.personalService.updaterClient(this.ClientRequest,parseInt(this.id_personal));
        alert("se actualizó los datos correctamente");
       }else{

        this.personalService.saveClient(this.ClientRequest);
        alert("se guardo los datos exitozamente");
       }


      this.clientSubscription = this.personalService.ClientListener().subscribe(() => {

        this.lisratPersonal() ;
        form.reset();
        this.closeModal();

      });



  }
  nuevo(form: NgForm):void{
    form.reset();
    this.id_personal="null";
    this.activar="1";
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
  editar(client:Client){

    this.activar="0";
    this.id_personal=client.id;
     this.nombre=client.name_client;
     this.tipo_documento=client.type_document;
     this.num_documento=client.number_document;

  }



  lisratPersonal() {



    this.clientSubscription =  this.personalService
      .listClient(this.page, this.size, this.order, this.asc)
      .subscribe(
        (data) => {
          this.Client = data.content;
          this.isFirst = data.first;
          this.isLast = data.last;
          this.totalPages = new Array(data.totalPages);
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  eliminar(id:number):void{
    this.clientSubscription =  this.personalService
      .deleteClient(id)
      .subscribe(
        (data) => {
          alert("se elimino correctamente el dato");
          this.lisratPersonal();
        },
        (err) => {
          alert("error: no se puede eliminar el personal");
          console.log(err.error);
        }
      );

  }


  selectTipodoc(tp:string){
    this.tipo_documento=tp;
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
