import { Component, OnInit } from '@angular/core';
import { MysqlService } from './../../../services/mysql.service';
import { environment } from '../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GraficarService } from './../../../services/graficar.service';
import { JspdfService } from './../../../services/jspdf.service';

@Component({
  selector: 'app-reporte7',
  templateUrl: './reporte7.component.html',
  styles: []
})
export class Reporte7Component implements OnInit {

  public currentDate = new Date();

  public data;

  public ejeX = [];
  public ejeY = [];

  public date1;
  public date2;

  constructor(private mysqlService: MysqlService, 
              private modalService: NgbModal,
              private graficarService: GraficarService, 
              private jspdfService: JspdfService) { 

              }

  ngOnInit(): void {
    document.getElementById('cinco').style.display = 'none';
  }
          
  downloadPDF() {
     this.jspdfService.downloadPDF2('htmlData7');
  }
            
              open(content) {
                if ( this.date1 && this.date2 ) { // valida que llenen los datos primero
                  let d1;
                  let d2;
                  if (this.date1 > this.date2) {
                    d1 = this.date2;
                    d2 = this.date1;
                  } else {
                    d1 = this.date1;
                    d2 = this.date2;
                  }
            
                  this.ejeY = []; // quita los datos anteriores en caso de haberlos
                  this.ejeX = [];
            
                  this.modalService.open(content, { size: 'lg' }); // abre el modal y define que tamaño va a tener
                  this.mysqlService
                  .consulta(`${environment.API_URL}/reporte-ventas1/${d1}/${d2}`)
                  .subscribe((res: any) => {
                    this.data = res.array;
                    res.array.map(o => {
                      this.ejeX.push(o.nombre);
                      this.ejeY.push(o.cantidad);
                    });
                    // crea la grafica, debe ir despues de abrir el modal
                    this.graficarService.create(this.ejeX, this.ejeY, 'bar7', 'bar', 'Producto más vendido');
                  });
                } else {
                  document.getElementById('cinco').style.display = 'block';
                  setTimeout(() => document.getElementById('cinco').style.display = 'none', 5000);
                }
            
              }
            
              private getDismissReason(reason: any): string {
                if (reason === ModalDismissReasons.ESC) {
                  return 'by pressing ESC';
                } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
                  return 'by clicking on a backdrop';
                } else {
                  return `with: ${reason}`;
                }
              }
            
              cerrar(alerta: string) {
                document.getElementById(alerta).style.display = 'none';
              }
            
            }