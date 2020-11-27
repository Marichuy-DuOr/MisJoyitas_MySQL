import { Component, OnInit } from '@angular/core';
import { MysqlService } from './../../../services/mysql.service';
import { environment } from '../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GraficarService } from './../../../services/graficar.service';
import { JspdfService } from './../../../services/jspdf.service';

@Component({
  selector: 'app-reporte4',
  templateUrl: './reporte4.component.html',
  styles: []
})
export class Reporte4Component implements OnInit {

  public currentDate = new Date();

  public data1;
  public data2;

  public ejeX1 = ['oro', 'plata'];

  public ejeX2 = ['0', '1', 'Anillos', 'Colgantes', 'Pulseras', 'Collares', 'Broches', 'Cadenas',
    'Pendientes', 'Anillos de compromiso', 'Alianzas', '11', 'Gemelos', 'Collares Hombre',
    'Cadenas Hombre', 'Esclavas Hombre', 'Anillos Hombre', 'Pendientes Hombre', '18', 'Anillos Niño',
    'Pulseras Niño', 'Colgantes Niño', 'Pendientes Niño'];

  public ejeY1 = [0, 0];
  public ejeY2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(
    private mysqlService: MysqlService, // base de datos
    private modalService: NgbModal, // para abrir el modal desde el ts
    private graficarService: GraficarService, // genera la gráfica
    private jspdfService: JspdfService, // genera los pdf
    ) {
  }

  ngOnInit(): void {
  }

  downloadPDF(id) {
    this.jspdfService.downloadPDF2(id);
  }

  open1(content) {
    this.ejeY1 = [0, 0];

    this.modalService.open(content, { size: 'lg' }); // abre el modal y define que tamaño va a tener

    this.mysqlService
    .consulta(`${environment.API_URL}/reporte-compras41`)
    .subscribe((res: any) => {
      this.data1 = res.array;
      res.array.map(o => {
        this.ejeY1[o.material] = o.cantidad;
      });
      // crea la grafica, debe ir despues de abrir el modal
      this.graficarService.create(this.ejeX1, this.ejeY1, 'bar41', 'pie', 'Existencias según material');
    });

  }

  open2(content) {
    this.ejeY2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.modalService.open(content, { size: 'lg' }); // abre el modal y define que tamaño va a tener

    this.mysqlService
    .consulta(`${environment.API_URL}/reporte-compras42`)
    .subscribe((res: any) => {
      this.data2 = res.array;
      res.array.map(o => {
        this.ejeY2[o.tipo] = o.cantidad;
      });
      this.graficarService.quitaAuxiliares(this.ejeX2, this.ejeY2, 'bar42', 'bar', 'Existencias segun tipo de producto');
    });

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
