import { Component, OnInit } from '@angular/core';
import { MysqlService } from './../../../services/mysql.service';
import { environment } from '../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GraficarService } from './../../../services/graficar.service';
import { JspdfService } from './../../../services/jspdf.service';

@Component({
  selector: 'app-reporte10',
  templateUrl: './reporte10.component.html',
  styles: []
})
export class Reporte10Component implements OnInit {

  public currentDate = new Date();

  public data;

  public ejeY = [];
  public ejeX = [];

  constructor(private mysqlService: MysqlService, // base de datos
    private modalService: NgbModal, // para abrir el modal desde el ts
    private graficarService: GraficarService, // genera la gráfica
    private jspdfService: JspdfService, // genera los pdf
  ) { }

    ngOnInit(): void {
    }
  
    downloadPDF() {
      this.jspdfService.downloadPDF2('htmlData10');
    }

    open(content) {
      this.ejeY = []; // quita los datos anteriores en caso de haberlos
      this.ejeX = [];
      
        this.modalService.open(content, { size: 'lg' }); // abre el modal y define que tamaño va a tener
        this.mysqlService
        .consulta(`${environment.API_URL}/reporte-ventas4`)
        .subscribe((res: any) => {
          this.data = res.array;
          console.log(this.data);
          res.array.map(o => {
            this.ejeX.push(o.id);
            this.ejeY.push(o.suma);
          });
          // crea la grafica, debe ir despues de abrir el modal
          this.graficarService.create(this.ejeX, this.ejeY, 'bar10', 'bar', 'Cliente con más compras');
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