import { Component, OnInit } from '@angular/core';
import { MysqlService } from './../../../services/mysql.service';
import { environment } from '../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GraficarService } from './../../../services/graficar.service';
import { JspdfService } from './../../../services/jspdf.service';

@Component({
  selector: 'app-reporte1',
  templateUrl: './reporte1.component.html',
  styles: []
})
export class Reporte1Component implements OnInit {

  public mes;
  public anio;

  public data;

  public ejeX = [];
  public ejeY = [];

  public meses = ['', 'enero', 'febrero', 'marzo', 'abrir', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  constructor(
    private mysqlService: MysqlService, // base de datos
    private modalService: NgbModal, // para abrir el modal desde el ts
    private graficarService: GraficarService, // genera la gráfica
    private jspdfService: JspdfService, // genera los pdf
    ) {
  }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
  }

  downloadPDF() {
    this.jspdfService.downloadPDF('htmlData');
  }

  open(content) {
    if ( this.mes && this.anio) { // valida que llenen los datos primero
      this.ejeX = [];
      this.ejeY = []; // quita los datos anteriores en caso de haberlos

      this.modalService.open(content, { size: 'lg' }); // abre el modal y define que tamaño va a tener
      this.mysqlService
      .consulta(`${environment.API_URL}/reporte-compras1/${this.mes}/${this.anio}`)
      .subscribe((res: any) => {
        this.data = res.array;
        res.array.map(o => {
          this.ejeX.push(o.proveedor);
          this.ejeY.push(o.no_compras);
        });
        // crea la grafica, debe ir despues de abrir el modal
        this.graficarService.create(this.ejeX, this.ejeY, 'bar', 'pie', 'Reporte mensual de compras por proveedor');
      });
    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
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
