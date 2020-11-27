import { Component, OnInit } from '@angular/core';
import { MysqlService } from './../../../services/mysql.service';
import { environment } from '../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GraficarService } from './../../../services/graficar.service';
import { JspdfService } from './../../../services/jspdf.service';

@Component({
  selector: 'app-reporte3',
  templateUrl: './reporte3.component.html',
  styles: []
})
export class Reporte3Component implements OnInit {

  public data;

  public busqueda;
  public idProveedor;
  public proveedores;
  public nombreProveedor;

  public ejeX = ['0', '1', 'Anillos', 'Colgantes', 'Pulseras', 'Collares', 'Broches', 'Cadenas',
    'Pendientes', 'Anillos de compromiso', 'Alianzas', '11', 'Gemelos', 'Collares Hombre',
    'Cadenas Hombre', 'Esclavas Hombre', 'Anillos Hombre', 'Pendientes Hombre', '18', 'Anillos Niño',
    'Pulseras Niño', 'Colgantes Niño', 'Pendientes Niño'];

  public ejeY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(
    private mysqlService: MysqlService, // base de datos
    private modalService: NgbModal, // para abrir el modal desde el ts
    private graficarService: GraficarService, // genera la gráfica
    private jspdfService: JspdfService, // genera los pdf
    ) {
  }

  ngOnInit(): void {
    document.getElementById('tres').style.display = 'none';
  }

  downloadPDF() {
    this.jspdfService.downloadPDF('htmlData3');
  }

  buscarProveedor() {
    if (this.busqueda) {
      this.mysqlService
      .consulta(`${environment.API_URL}/proveedor-nombre/${this.busqueda}`)
      .subscribe((res: any) => {
        this.proveedores = res.array;
      });
    } else {
      document.getElementById('tres').style.display = 'block';
      setTimeout(() => document.getElementById('tres').style.display = 'none', 5000);
    }
  }

  open(content) {
    if ( this.idProveedor ) { // valida que llenen los datos primero
      this.ejeY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // quita los datos anteriores en caso de haberlos
      let i = 0;
      for ( i ; i < this.proveedores.length; i++) {
        if (this.proveedores[i].id == this.idProveedor) {
          this.nombreProveedor = this.proveedores[i].nombre;
          break;
        }
      }

      this.modalService.open(content, { size: 'lg' }); // abre el modal y define que tamaño va a tener
      this.mysqlService
      .consulta(`${environment.API_URL}/reporte-compras3/${this.idProveedor}`)
      .subscribe((res: any) => {
        this.data = res.array;
        res.array.map(o => {
          this.ejeY[o.tipo] = o.cantidad;
        });
        // crea la grafica, debe ir despues de abrir el modal
        this.graficarService.quitaAuxiliares(this.ejeX, this.ejeY, 'bar3', 'bar', 'Promedio de gastos en compras');
      });
    } else {
      document.getElementById('tres').style.display = 'block';
      setTimeout(() => document.getElementById('tres').style.display = 'none', 5000);
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
