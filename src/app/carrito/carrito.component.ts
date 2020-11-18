import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { MysqlService } from '../services/mysql.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styles: []
})
export class CarritoComponent implements OnInit {

  cantidadForm = new FormGroup({
    cantidad: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(2)])
  });

  public productos = [];
  public existencia = [];
  public subtotal = 0;
  public p = [];

  constructor(private router: Router, 
    private carritoService: CarritoService, 
    private mysqlService: MysqlService) {}

  ngOnInit(): void {
    this.actualizar();
    }

  public pull(id: string,  cantidad: string) {
     this.mysqlService.delete(`${environment.API_URL}/carrito/${id}/${cantidad}`)
          .subscribe((res: any) => {
            console.log(res);
            
            this.actualizar();
            document.getElementById('uno').style.display = 'block';
            setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
          });
    }

  public actualizar(){
    this.productos = [];
    this.subtotal = 0;
    this.mysqlService
    .consulta(`${environment.API_URL}/carrito`)
    .subscribe((res: any) => {
      console.log(res);

      res.array.forEach((p: any) => {
        this.mysqlService
        .consultaId(`${environment.API_URL}/producto/${p.id_producto}`)
        .subscribe((res: any) => {
          const total = Number(p.cantidad) * Number(res.id[0].precio_venta);
          this.subtotal += total;
          const data: DatosVenta = {
            idProducto: p.id_producto,
            nombre: res.id[0].nombre,
            cantidad: p.cantidad,
            precio: res.id[0].precio_venta,
            total: total.toString(),
            imagen: res.id[0].imagen 
          };
          this.productos.push(data);
        });
        console.log(this.productos);
      });
    });
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}


interface DatosVenta {
  nombre: string;
  idProducto: string;
  cantidad: string;
  precio: string;
  total: string;
  imagen: string;
}