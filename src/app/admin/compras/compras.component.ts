import { Component, OnInit } from '@angular/core';
import { MysqlService } from './../../services/mysql.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: []
})
export class ComprasComponent implements OnInit {

  public proveedores;
  public productosProveedores;
  public productoCompras = [];
  public total = 0;

  public currentStatus = 1;
  public proveedor = {
    nombre: '',
    id: '',
  };

  public productoProveedor = new FormGroup({
    busquedaProveedor: new FormControl(''),
    id_proveedor: new FormControl('', Validators.required),
    id_producto: new FormControl('', Validators.required),
    nombreProducto: new FormControl('', Validators.required),
    precio_compra: new FormControl('', Validators.required),
    cantidad: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]*$')]),
  });
  public buscarForm = new FormGroup({
    busqueda: new FormControl('', Validators.required),
  });

  constructor(private mysqlService: MysqlService ) {
    this.productoProveedor.setValue({
      busquedaProveedor: '',
      id_producto: '',
      id_proveedor: '',
      nombreProducto: '',
      precio_compra: '',
      cantidad: ''
    });
    this.buscarForm.setValue({
      busqueda: '',
    });
  }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
    document.getElementById('tres').style.display = 'none';
    document.getElementById('cuatro').style.display = 'none';
    document.getElementById('cinco').style.display = 'none';
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

  finalizarCompra() {

    const body = {
      id_proveedor: this.proveedor.id,
      total: this.total,
    };

    this.mysqlService.alta(`${environment.API_URL}/compra`, body)
    .then((data) => {
      document.getElementById('cinco').style.display = 'block';
      setTimeout(() => document.getElementById('cinco').style.display = 'none', 5000);
      let body2;
      let body3;
      let i = 0;
      for ( i ; i < this.productoCompras.length; i++) {
        body2 = {
          id_compra: data['array'].insertId,
          id_producto: this.productoCompras[i].id_producto,
          precio: this.productoCompras[i].precio_compra,
          cantidad: this.productoCompras[i].cantidad
        };
        this.mysqlService.alta(`${environment.API_URL}/producto-compra`, body2)
        .then((laData) => {
        })
        .catch((err) => {
          console.log(err);
        });
      }
      this.total = 0;
      this.proveedor.nombre = '';
      this.proveedor.id = '';
      this.productoCompras = [];
      this.productosProveedores = null;
      this.productoProveedor.setValue({
        busquedaProveedor: '',
        id_producto: '',
        id_proveedor: '',
        nombreProducto: '',
        precio_compra: '',
        cantidad: ''
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  onProveedorSelect(idSelectProveedor) {
    let i = 0;
    for ( i ; i < this.proveedores.length; i++) {
      if (this.proveedores[i].id == idSelectProveedor) {
        this.proveedor.nombre = this.proveedores[i].nombre;
        this.proveedor.id = this.proveedores[i].id;
        break;
      }
    }
    this.productoCompras = [];
    this.mysqlService
      .consulta(`${environment.API_URL}/proveedor-producto/${idSelectProveedor}`)
      .subscribe((res: any) => {
        this.productosProveedores = res.array;
    });
    this.total = 0;
    this.productoProveedor.get('id_producto').setValue('');
    this.productoProveedor.get('nombreProducto').setValue('');
    this.productoProveedor.get('precio_compra').setValue('');
    this.productoProveedor.get('cantidad').setValue('');
  }

  agregarProducto(form) {
    if (this.productoProveedor.valid) {
        const data = {
          id_producto: form.id_producto,
          nombreProducto: form.nombreProducto,
          precio_compra: form.precio_compra,
          cantidad: form.cantidad
        };

        this.total += data.cantidad * data.precio_compra;

        let i = 0;
        let band = true;
        for ( i ; i < this.productoCompras.length; i++) {
          if (this.productoCompras[i].id_producto === data.id_producto ) {
            this.productoCompras[i].cantidad += data.cantidad;
            band = false;
            break;
          }
        }

        if (band) {
          this.productoCompras.push(data);
          document.getElementById('tres').style.display = 'block';
          setTimeout(() => document.getElementById('tres').style.display = 'none', 5000);
        } else {
          document.getElementById('cuatro').style.display = 'block';
          setTimeout(() => document.getElementById('cuatro').style.display = 'none', 5000);
        }
        this.productoProveedor.get('id_producto').setValue('');
        this.productoProveedor.get('nombreProducto').setValue('');
        this.productoProveedor.get('precio_compra').setValue('');
        this.productoProveedor.get('cantidad').setValue('');

    } else {
      document.getElementById('dos').style.display = 'block';
      setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
    }
  }

  public seleccionarProducto(tupla) {
    this.productoProveedor.get('id_producto').setValue(tupla.id_producto);
    this.productoProveedor.get('nombreProducto').setValue(tupla.nombre);
    this.productoProveedor.get('precio_compra').setValue(tupla.precio_compra);
  }

  deleteProducto(tuplaId) {
    let i = 0;
    for ( i ; i < this.productoCompras.length; i++) {
      if (this.productoCompras[i].id_producto == tuplaId) {
        this.total -= this.productoCompras[i].cantidad * this.productoCompras[i].precio_compra;
        this.productoCompras.splice( i , 1 );
        break;
      }
    }
  }

  buscar(form) {
    if (this.buscarForm.valid) {
      this.mysqlService
      .consulta(`${environment.API_URL}/proveedor-producto-busqueda/${this.proveedor.id}/${form.busqueda}`)
      .subscribe((res: any) => {
        this.productosProveedores = res.array;
      });
    }
  }

  actualizar() {
    this.mysqlService
      .consulta(`${environment.API_URL}/proveedor-producto/${this.proveedor.id}`)
      .subscribe((res: any) => {
        this.productosProveedores = res.array;
    });
  }

  actualizarMinimo() {
    this.mysqlService
      .consulta(`${environment.API_URL}/proveedor-producto-minimo/${this.proveedor.id}`)
      .subscribe((res: any) => {
        this.productosProveedores = res.array;
    });
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }
}
