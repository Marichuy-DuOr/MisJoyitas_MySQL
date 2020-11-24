import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MysqlService } from '../services/mysql.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styles: [],
  providers: [DatePipe]
})
export class PagoComponent implements OnInit {

  public user;
  public municipios;
  public productos = [];
  public subtotal = 0;
  public total = 0;
  public existencia = [];
  public fecha;
  public venta;
  public datosVenta;
  public bandera = false;

  public editDireccionForm = new FormGroup({
    colonia: new FormControl('', Validators.required),
    calle: new FormControl('', Validators.required),
    id_municipio: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    interior: new FormControl(Validators.nullValidator),
    cp: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5), Validators.maxLength(5)]),
    busqueda: new FormControl(Validators.nullValidator)
  });

  public newTarjetaForm = new FormGroup({
    id: new FormControl(''),
    tarjeta: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(16), Validators.maxLength(16)]),
    nombre: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    mes: new FormControl('', Validators.required),
    anio: new FormControl('', Validators.required),
    cvc: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(3), Validators.maxLength(3)])
  });

  constructor(private mysqlService: MysqlService,
              private configAlert: NgbAlertConfig, 
              private router: Router,
              private miDatePipe: DatePipe) { 
                this.newTarjetaForm.setValue({
                  id: '',
                  tarjeta:'',
                  nombre: '',
                  apellidos:'',
                  mes: '',
                  anio: '',
                  cvc: ''
                });
              }

  ngOnInit(): void {
    this.actualizar();
  }

  public actualizar() {
    this.mysqlService
      .consulta(`${environment.API_URL}/mainUser-datos`)
      .subscribe((res: any) => {
        console.log(res);
        this.user = res.array[0];

        this.editDireccionForm.setValue({
          colonia: this.user.colonia,
          calle: this.user.calle,
          id_municipio: this.user.id_municipio,
          numero: this.user.numero,
          interior: this.user.interior,
          cp: this.user.cp,
          busqueda: this.user.municipio
        });

      });

    this.subtotal = 0;
    this.mysqlService
    .consulta(`${environment.API_URL}/carrito`)
    .subscribe((res: any) => {
      console.log(res);

      res.array.forEach((p: any) => {
        this.mysqlService
        .consultaId(`${environment.API_URL}/producto/${p.id_producto}`)
        .subscribe((res: any) => {

          if(res.id[0].existencia > 0){
            if(p.cantidad <= res.id[0].existencia){
              const sub = Number(p.cantidad) * Number(res.id[0].precio_venta);
              this.subtotal += sub;
              this.total= this.subtotal + 170;
              const data: DatosVenta = {
                id_producto: p.id_producto,
                precio: res.id[0].precio_venta,
                cantidad: p.cantidad
              }
              this.productos.push(data);
            }else{
              document.getElementById('cinco').style.display = 'block';
              setTimeout(() => document.getElementById('cinco').style.display = 'none', 5000);
            }
          }else{
            document.getElementById('seis').style.display = 'block';
              setTimeout(() => document.getElementById('seis').style.display = 'none', 5000);
          }
          
          
        });
      });
    });
  }

    public editDirecc(form) {
      if (this.editDireccionForm.valid) {
        const body = {
          colonia: form.colonia,
          calle: form.calle,
          id_municipio: form.id_municipio,
          numero: form.numero,
          interior: form.interior,
          cp: form.cp
        };
  
  
        this.mysqlService.cambio(`${environment.API_URL}/direccion`, body)
        .subscribe((res: any) => {
          document.getElementById('dos').style.display = 'block';
          setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
          this.actualizar();
        });
  
      } else {
        document.getElementById('uno').style.display = 'block';
        setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
      }
  
    }
  
    public getMunicipio(busqueda) {
      this.mysqlService.consultaNoT(`${environment.API_URL}/municipio/${busqueda}` )
        .subscribe((res: any) => {
          this.municipios = res.array;
        });
    }

    public newTarjeta(form) {
      if (this.newTarjetaForm.valid) {
          let fecha = form.anio.concat("-"+form.mes+"-01");
          let data = {
              num_tarjeta: form.tarjeta,
              fecha_vencimiento: fecha,
              cvc: form.cvc
          };
          console.log(data);
          this.mysqlService.alta(`${environment.API_URL}/tarjeta`, data)
          .then((laData) => {
          document.getElementById('cuatro').style.display = 'block';
          setTimeout(() => document.getElementById('cuatro').style.display = 'none', 5000);
          this.bandera = true;
        });
        }else{
          document.getElementById('tres').style.display = 'block';
          setTimeout(() => document.getElementById('tres').style.display = 'none', 5000);
        }
    }

    public fecha_venta(){
      let currentDate = new Date();

      let hour:any = currentDate.getHours();
      let minute:any = currentDate.getMinutes();
      let second:any = currentDate.getSeconds();
      let day:any = currentDate.getDate();
      let month:any = currentDate.getMonth() + 1;
      let year:any = currentDate.getFullYear();

      if(hour<10){
        hour = "0" + hour.toString();
      }
      if(minute<10){
        minute = "0" + minute.toString();
      }
      if(second<10){
        second = "0" + second.toString();
      }
      if(day<10){
        day = "0" + day.toString();
      }
      if(month<10){
        month = "0" + month.toString();
      }
      this.fecha = year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
    }

    public altaVenta(){
      if(this.bandera){

        this.fecha_venta();

        const dataVenta: Venta = {
          id_tarjetas: "1",
          total: this.total.toString(),
          fecha: this.fecha.toString()
        };

        this.actualizar();

        this.mysqlService.alta(`${environment.API_URL}/venta`, dataVenta)
        .then((laData) => {
          console.log("Venta registrada");
        });

        this.mysqlService.consultaId(`${environment.API_URL}/venta/${this.fecha}`)
            .subscribe((res: any) => {
              console.log(res.id[0].id);

              this.productos.forEach((p: any) => {

                const venta: DatosVenta2 = {
                  id_ventas: res.id[0].id,
                  id_producto: p.id_producto,
                  precio: p.precio,
                  cantidad: p.cantidad
                };

                const existencia = {
                  id_producto: p.id_producto,
                  cantidad: p.cantidad
                };

                this.mysqlService.alta(`${environment.API_URL}/productoVenta`, venta)
                  .then((laData) => {
                    console.log("Datos venta registrada");
                }).catch((err) => {
                  console.log(err);
                });

                
                this.mysqlService.alta(`${environment.API_URL}/producto`, venta)
                  .then((laData) => {
                    console.log("Datos venta registrada");
                }).catch((err) => {
                  console.log(err);
                });

                this.mysqlService.cambio(`${environment.API_URL}/producto`, existencia)
                  .subscribe((res: any) => {
                    console.log("Existencia actualizada");
                });

                this.mysqlService.delete(`${environment.API_URL}/carrito/${p.id_producto}/${p.cantidad}`)
                .subscribe((res: any) => {
                    console.log("Producto eliminado del carrito");
                });
                
              });
            });

            

            this.router.navigate(['/ventaFinalizada']);

      }else{
        document.getElementById('ocho').style.display = 'block';
        setTimeout(() => document.getElementById('ocho').style.display = 'none', 5000);
      }  
    }

    cerrar(alerta: string) {
      document.getElementById(alerta).style.display = 'none';
    }

}

interface Venta {
  id_tarjetas: string;
  total: string;
  fecha: string;
}

interface DatosVenta {
  id_producto: string;
  precio: string;
  cantidad: string;
}

interface DatosVenta2 {
  id_ventas: number;
  id_producto: string;
  precio: string;
  cantidad: string;
}