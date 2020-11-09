import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MysqlService } from '../../services/mysql.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cambiar-roles',
  templateUrl: './cambiar-roles.component.html',
  styles: []
})
export class CambiarRolesComponent implements OnInit {

  public users = [];

  public currentStatus = 1;
  public newUserForm = new FormGroup({
    correo: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required)
  });

  constructor( private mysqlService: MysqlService, private configAlert: NgbAlertConfig ) {
    this.newUserForm.setValue({
      correo: '',
      rol: ''
    });
    configAlert.type = 'danger';
    configAlert.dismissible = true;
  }

  ngOnInit(): void {
    this.actualizar();
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
  }

  public actualizar() {
    this.mysqlService
      .consulta(`${environment.API_URL}/roles`)
      .subscribe((res: any) => {
        console.log(res);
        this.users = res.array;
      });
  }

  public newUser(form) {
    if (this.currentStatus == 1) {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
    } else {
      const data = {
        correo: form.correo,
        rol: form.rol
      };

      this.mysqlService.cambio(`${environment.API_URL}/cambiar-rol`, data)
        .subscribe((res: any) => {
          console.log(res);
          this.currentStatus = 1;
          this.newUserForm.setValue({
            correo: '',
            rol: ''
          });
          this.actualizar();
          document.getElementById('dos').style.display = 'block';
          setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
      });
    }
  }

  public editUser(user) {
    this.currentStatus = 2;
    this.newUserForm.setValue({
      correo: user.correo,
      rol: user.rol
    });
    console.log(user);
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }


}
