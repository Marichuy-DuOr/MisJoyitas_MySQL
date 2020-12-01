import { Component, OnInit } from '@angular/core';
import { MysqlService } from './../../../services/mysql.service';
import { environment } from '../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GraficarService } from './../../../services/graficar.service';
import { JspdfService } from './../../../services/jspdf.service';

@Component({
  selector: 'app-reporte8',
  templateUrl: './reporte8.component.html',
  styles: []
})
export class Reporte8Component implements OnInit {

  public currentDate = new Date();

  public anio;

  public data;

  public ejeX = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  public ejeY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(
    private mysqlService: MysqlService, // base de datos
    private modalService: NgbModal, // para abrir el modal desde el ts
    private graficarService: GraficarService, // genera la gráfica
    private jspdfService: JspdfService, // genera los pdf
    ) {
  }

  ngOnInit(): void {
    document.getElementById('dos').style.display = 'none';
  }

  downloadPDF() {
    this.jspdfService.downloadPDF2('htmlData8');
  }

  open(content) {
    if ( this.anio ) { // valida que llenen los datos primero
      this.ejeY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // quita los datos anteriores en caso de haberlos

      this.modalService.open(content, { size: 'lg' }); // abre el modal y define que tamaño va a tener
      this.mysqlService
      .consulta(`${environment.API_URL}/reporte-ventas2/${this.anio}`)
      .subscribe((res: any) => {
        this.data = res.array;
        res.array.map(o => {
          this.ejeY[o.mes - 1] = o.suma;
        });
        // crea la grafica, debe ir despues de abrir el modal
        this.graficarService.create(this.ejeX, this.ejeY, 'bar8', 'bar', 'Ganancias');
      });
    } else {
      document.getElementById('dos').style.display = 'block';
      setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
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