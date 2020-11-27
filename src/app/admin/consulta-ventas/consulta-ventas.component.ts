import { Component, OnInit } from '@angular/core';
import { MysqlService } from './../../services/mysql.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-consulta-ventas',
  templateUrl: './consulta-ventas.component.html',
  styles: []
})
export class ConsultaVentasComponent implements OnInit {

  public ventas;
  public productoVentas;
  closeResult = '';

  public buscarForm = new FormGroup({
    fecha1: new FormControl('', Validators.required),
    fecha2: new FormControl('', Validators.required),
  });

  constructor( private mysqlService: MysqlService ) {
    this.buscarForm.setValue({
      fecha1: '',
      fecha2: '',
    });
  }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    this.mysqlService
      .consulta(`${environment.API_URL}/ventas`)
      .subscribe((res: any) => {
        this.ventas = res.array;
      });
  }

  open(idVenta) {
    this.mysqlService
      .consulta(`${environment.API_URL}/producto-venta/${idVenta}`)
      .subscribe((res: any) => {
        console.log(res);
        this.productoVentas = res.array;
      });
  }

  buscar(form) {
    if (this.buscarForm.valid) {
      let f1;
      let f2;
      if (form.fecha1 > form.fecha2) {
        f1 = form.fecha2;
        f2 = form.fecha1;
      } else {
        f1 = form.fecha1;
        f2 = form.fecha2;
      }
      this.mysqlService
      .consulta(`${environment.API_URL}/ventas-por-fecha/${f1}/${f2}`)
      .subscribe((res: any) => {
        this.ventas = res.array;
      });
    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
    }
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
