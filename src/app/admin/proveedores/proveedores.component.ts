import { Component, OnInit } from '@angular/core';
import { MysqlService } from './../../services/mysql.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styles: []
})
export class ProveedoresComponent implements OnInit {

  public proveedores = [];
  public inactivos ;

  public tuplaId = null;
  public currentStatus = 1;
  public newProveedorForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]),
  });
  public buscarForm = new FormGroup({
    busqueda: new FormControl('', Validators.required),
  });

  constructor( private mysqlService: MysqlService ) {
    this.newProveedorForm.setValue({
      id: '',
      nombre: '',
      correo: '',
      telefono: ''
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
    this.actualizar();
  }

  public actualizar() {
    this.mysqlService
      .consulta(`${environment.API_URL}/proveedores`)
      .subscribe((res: any) => {
        console.log(res);
        this.proveedores = res.array;
      });
  }

  public newProveedor(form, tuplaId = this.tuplaId) {
    if (this.newProveedorForm.valid) {
      if (this.currentStatus == 1) {
        let data = {
          nombre: form.nombre,
          correo: form.correo,
          telefono: form.telefono
        };

        this.mysqlService.alta(`${environment.API_URL}/proveedor`, data)
        .then((laData) => {
          document.getElementById('dos').style.display = 'block';
          setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
          this.newProveedorForm.setValue({
            id: '',
            nombre: '',
            correo: '',
            telefono: ''
          });
          this.actualizar();
        })
        .catch((err) => {
          console.log(err);
        });

      } else {
        let data = {
          id: form.id,
          nombre: form.nombre,
          correo: form.correo,
          telefono: form.telefono
        };

        this.mysqlService.cambio(`${environment.API_URL}/proveedor`, data)
          .subscribe((res: any) => {
            console.log(res);
            this.currentStatus = 1;
            this.newProveedorForm.setValue({
              id: '',
              nombre: '',
              correo: '',
              telefono: ''
            });
            document.getElementById('dos').style.display = 'block';
            setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
            this.actualizar();
          });
      }
    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
    }
  }

  public editProveedor(tupla) {
    this.currentStatus = 2;
    this.newProveedorForm.setValue({
      id: tupla.id,
      nombre: tupla.nombre,
      correo: tupla.correo,
      telefono: tupla.telefono
    });
  }

  public deleteProveedor(tuplaId, estado) {
    const data = {
      id: tuplaId,
      is_active: estado
    };
    this.mysqlService.cambio(`${environment.API_URL}/proveedor-activacion`, data)
      .subscribe((res: any) => {
        console.log(res);
        this.actualizar();
        if (this.inactivos){
          this.getInactivos();
        }
        document.getElementById('tres').style.display = 'block';
        setTimeout(() => document.getElementById('tres').style.display = 'none', 5000);
    });
  }

  buscar(form) {
    if (this.buscarForm.valid) {
      this.mysqlService
      .consulta(`${environment.API_URL}/proveedor/${form.busqueda}`)
      .subscribe((res: any) => {
        this.proveedores = res.array;
      });
    } else {
      document.getElementById('cuatro').style.display = 'block';
      setTimeout(() => document.getElementById('cuatro').style.display = 'none', 5000);
    }
  }

  getInactivos() {
    this.mysqlService
      .consulta(`${environment.API_URL}/proveedores-inactivos`)
      .subscribe((res: any) => {
        console.log(res);
        this.inactivos = res.array;
      });
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
