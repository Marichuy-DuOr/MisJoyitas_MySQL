import { Component, OnInit } from '@angular/core';
import { MysqlService } from './../../../services/mysql.service';
import { environment } from '../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GraficarService } from './../../../services/graficar.service';
import { JspdfService } from './../../../services/jspdf.service';

@Component({
  selector: 'app-reporte5',
  templateUrl: './reporte5.component.html',
  styles: []
})
export class Reporte5Component implements OnInit {

  public currentDate = new Date();

  public data;

  public ejeX = [];
  public ejeY = [];

  public fecha1;
  public fecha2;

  constructor(
    private mysqlService: MysqlService, // base de datos
    private modalService: NgbModal, // para abrir el modal desde el ts
    private graficarService: GraficarService, // genera la gráfica
    private jspdfService: JspdfService, // genera los pdf
    ) {
  }

  ngOnInit(): void {
    document.getElementById('cinco').style.display = 'none';
  }

  downloadPDF() {
    this.jspdfService.downloadPDF2('htmlData5');
  }

  open(content) {
    if ( this.fecha1 && this.fecha2 ) { // valida que llenen los datos primero
      let f1;
      let f2;
      if (this.fecha1 > this.fecha2) {
        f1 = this.fecha2;
        f2 = this.fecha1;
      } else {
        f1 = this.fecha1;
        f2 = this.fecha2;
      }

      this.ejeY = []; // quita los datos anteriores en caso de haberlos
      this.ejeX = [];

      this.modalService.open(content, { size: 'lg' }); // abre el modal y define que tamaño va a tener
      this.mysqlService
      .consulta(`${environment.API_URL}/reporte-compras5/${f1}/${f2}`)
      .subscribe((res: any) => {
        this.data = res.array;
        res.array.map(o => {
          this.ejeX.push(o.nombre);
          this.ejeY.push(o.cantidad);
        });
        // crea la grafica, debe ir despues de abrir el modal
        this.graficarService.create(this.ejeX, this.ejeY, 'bar5', 'bar', 'Promedio de gastos en compras');
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
