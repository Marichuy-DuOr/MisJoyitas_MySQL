import { Component, OnInit } from '@angular/core';
import { MysqlService } from './../../services/mysql.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-consulta-compras',
  templateUrl: './consulta-compras.component.html',
  styles: []
})
export class ConsultaComprasComponent implements OnInit {

  public compras;

  public productoCompras;

  closeResult = '';

  constructor( private mysqlService: MysqlService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.mysqlService
      .consulta(`${environment.API_URL}/compras`)
      .subscribe((res: any) => {
        this.compras = res.array;
      });
  }

  open(idCompra) {
    this.mysqlService
      .consulta(`${environment.API_URL}/producto-compra/${idCompra}`)
      .subscribe((res: any) => {
        this.productoCompras = res.array;
      });
  }

}
