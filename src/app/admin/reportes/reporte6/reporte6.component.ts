import { Component, OnInit } from '@angular/core';
import { MysqlService } from './../../../services/mysql.service';
import { environment } from '../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GraficarService } from './../../../services/graficar.service';
import { JspdfService } from './../../../services/jspdf.service';

@Component({
  selector: 'app-reporte6',
  templateUrl: './reporte6.component.html',
  styles: []
})
export class Reporte6Component implements OnInit {

  public currentDate = new Date();

  public data;

  public busqueda;
  public idProducto;
  public productos;
  public nombreProducto;

  public ejeY = [];
  public ejeX = [];

  constructor(
    private mysqlService: MysqlService, // base de datos
    private modalService: NgbModal, // para abrir el modal desde el ts
    private graficarService: GraficarService, // genera la gráfica
    private jspdfService: JspdfService, // genera los pdf
    ) {
  }

  ngOnInit(): void {
    document.getElementById('seis').style.display = 'none';
  }

  downloadPDF() {
    this.jspdfService.downloadPDF2('htmlData6');
  }

  buscarProveedor() {
    if (this.busqueda) {
      this.mysqlService
      .consulta(`${environment.API_URL}/producto-nombre/${this.busqueda}`)
      .subscribe((res: any) => {
        this.productos = res.array;
      });
    } else {
      document.getElementById('seis').style.display = 'block';
      setTimeout(() => document.getElementById('seis').style.display = 'none', 5000);
    }
  }

  open(content) {
    if ( this.idProducto ) { // valida que llenen los datos primero
      this.ejeY = []; // quita los datos anteriores en caso de haberlos
      this.ejeX = []; // quita los datos anteriores en caso de haberlos
      let i = 0;
      for ( i ; i < this.productos.length; i++) {
        if (this.productos[i].id == this.idProducto) {
          this.nombreProducto = this.productos[i].nombre;
          break;
        }
      }

      this.modalService.open(content, { size: 'lg' }); // abre el modal y define que tamaño va a tener
      this.mysqlService
      .consulta(`${environment.API_URL}/reporte-compras6/${this.idProducto}`)
      .subscribe((res: any) => {
        this.data = res.array;
        res.array.map(o => {
          this.ejeX.push(o.proveedor);
          this.ejeY.push(o.cantidad);
        });
        // crea la grafica, debe ir despues de abrir el modal
        this.graficarService.create(this.ejeX, this.ejeY, 'bar6', 'bar', 'Promedio de gastos en compras');
      });
    } else {
      document.getElementById('seis').style.display = 'block';
      setTimeout(() => document.getElementById('seis').style.display = 'none', 5000);
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
