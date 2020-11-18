import { Component, OnInit } from '@angular/core';
import { MysqlService } from './../../services/mysql.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-precios-proveedores',
  templateUrl: './precios-proveedores.component.html',
  styles: []
})
export class PreciosProveedoresComponent implements OnInit {

  public proveedores;
  public productos;
  public productosProveedores;

  public currentStatus = 1;
  public proveedor = {
    nombre: '',
    id: '',
  };

  public productoProveedor = new FormGroup({
    id: new FormControl(''),
    busquedaProducto: new FormControl(''),
    busquedaProveedor: new FormControl(''),
    id_proveedor: new FormControl('', Validators.required),
    id_producto: new FormControl('', Validators.required),
    precio_compra: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]),
  });

  constructor(private mysqlService: MysqlService ) {
    this.productoProveedor.setValue({
      id: '',
      busquedaProducto: '',
      busquedaProveedor: '',
      id_producto: '',
      id_proveedor: '',
      precio_compra: ''
    });
  }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
    document.getElementById('tres').style.display = 'none';
    document.getElementById('cuatro').style.display = 'none';
  }

  buscarProveedor(buscar) {
    if (buscar) {
      this.mysqlService
      .consulta(`${environment.API_URL}/proveedor-nombre/${buscar}`)
      .subscribe((res: any) => {
        this.proveedores = res.array;
      });
    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
    }
  }

  buscarProducto(buscar) {
    if (buscar) {
      this.mysqlService
      .consulta(`${environment.API_URL}/producto-nombre/${buscar}`)
      .subscribe((res: any) => {
        this.productos = res.array;
      });
    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
    }
  }

  onProveedorSelect(idSelectProveedor, idSelectProducto) {
    let i = 0;
    for ( i ; i < this.proveedores.length; i++) {
      if (this.proveedores[i].id == idSelectProveedor) {
        this.proveedor.nombre = this.proveedores[i].nombre;
        this.proveedor.id = this.proveedores[i].id;
        break;
      }
    }
    this.mysqlService
      .consulta(`${environment.API_URL}/proveedor-producto/${idSelectProveedor}`)
      .subscribe((res: any) => {
        this.productosProveedores = res.array;
    });
    this.onProductoSelect(idSelectProveedor, idSelectProducto);
  }

  onProductoSelect(idSelectProveedor, idSelectProducto) {
    if (idSelectProveedor && idSelectProducto){
      this.mysqlService
        .consulta(`${environment.API_URL}/precio-compra/${idSelectProveedor}/${idSelectProducto}`)
        .subscribe((res: any) => {
          console.log(res);
          if (res.array.length > 0) {
            this.currentStatus = 2;
            this.productoProveedor.get('id').setValue(res.array[0].id);
            this.productoProveedor.get('precio_compra').setValue(res.array[0].precio_compra);
          } else {
            this.currentStatus = 1;
            this.productoProveedor.get('id').setValue('');
            this.productoProveedor.get('precio_compra').setValue('');
          }
      });
    }
  }

  newproductoProveedor(form) {
    if (this.productoProveedor.valid) {
      if (this.currentStatus == 1) {
        const data = {
          id_proveedor: form.id_proveedor,
          id_producto: form.id_producto,
          precio_compra: form.precio_compra
        };

        this.mysqlService.alta(`${environment.API_URL}/proveedor-producto`, data)
        .then((laData) => {
          document.getElementById('tres').style.display = 'block';
          setTimeout(() => document.getElementById('tres').style.display = 'none', 5000);
          this.productoProveedor.setValue({
            id: '',
            busquedaProducto: '',
            busquedaProveedor: '',
            id_producto: '',
            id_proveedor: data.id_proveedor,
            precio_compra: ''
          });
          this.onProveedorSelect(data.id_proveedor, '');
        })
        .catch((err) => {
          console.log(err);
        });

      } else {
        const data = {
          id: form.id,
          id_proveedor: form.id_proveedor,
          id_producto: form.id_producto,
          precio_compra: form.precio_compra
        };

        this.mysqlService.cambio(`${environment.API_URL}/proveedor-producto`, data)
          .subscribe((res: any) => {
            console.log(res);
            this.currentStatus = 1;
            this.productoProveedor.setValue({
              id: '',
              busquedaProducto: '',
              busquedaProveedor: '',
              id_producto: '',
              id_proveedor: data.id_proveedor,
              precio_compra: ''
            });
            document.getElementById('tres').style.display = 'block';
            setTimeout(() => document.getElementById('tres').style.display = 'none', 5000);
            this.onProveedorSelect(data.id_proveedor, '');
          });
      }
    } else {
      document.getElementById('dos').style.display = 'block';
      setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
    }
  }

  public deleteProducto(tuplaId) {
    this.mysqlService.delete(`${environment.API_URL}/proveedor-producto/${tuplaId}`)
      .subscribe((res: any) => {
        console.log(res);
        this.onProveedorSelect(this.proveedor.id, '');
        document.getElementById('cuatro').style.display = 'block';
        setTimeout(() => document.getElementById('cuatro').style.display = 'none', 5000);
      });
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }
}
