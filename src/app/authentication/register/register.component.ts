import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { MysqlService } from './../../services/mysql.service';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public municipios;

  public newUserForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    ape_pat: new FormControl('', Validators.required),
    ape_mat: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]),
    contrasena: new FormControl('', Validators.required),
    contrasenaVerf: new FormControl('', Validators.required),

    colonia: new FormControl('', Validators.required),
    calle: new FormControl('', Validators.required),
    id_municipio: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    interior: new FormControl(Validators.nullValidator),
    cp: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5), Validators.maxLength(5)]),
    busqueda: new FormControl(Validators.nullValidator)
  });

  constructor(private authService: AuthService, private mysqlService: MysqlService, private router: Router) {
    this.newUserForm.setValue({
      nombre: '',
      ape_pat: '',
      ape_mat: '',
      correo: '',
      telefono: '',
      contrasena: '',
      contrasenaVerf: '',

      colonia: '',
      calle: '',
      id_municipio: '',
      numero: '',
      interior: '',
      cp: '',
      busqueda: ''
    });
  }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
    document.getElementById('tres').style.display = 'none';
  }

  public newUser(form) {
    if (this.newUserForm.valid) {
      const body = {
        nombre: form.nombre,
        ape_pat: form.ape_pat,
        ape_mat: form.ape_mat,
        correo: form.correo,
        telefono: form.telefono,
        contrasena: form.contrasena,

      };


      if (body.contrasena === form.contrasenaVerf) {
        this.authService.register(body).then((data) => {
          if (!data['success']) {
            document.getElementById('tres').style.display = 'block';
            setTimeout(() => document.getElementById('tres').style.display = 'none', 5000);
          } else {
            const body2 = {
              id_usuario: data['array'].insertId, // consigue llave foranea del registro que acaba de ser creado
              colonia: form.colonia,
              calle: form.calle,
              id_municipio: form.id_municipio,
              numero: form.numero,
              interior: form.interior,
              cp: form.cp
            };
            this.mysqlService.altaNoT(`${environment.API_URL}/registerDom`, body2)
            .then((laData) => {
              this.router.navigate(['/login']);
            })
            .catch((err) => {
              console.log(err);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      } else {
        document.getElementById('dos').style.display = 'block';
        setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
      }
    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
    }

  }

  public getMunicipio(busqueda) {
    this.mysqlService.consultaNoT(`${environment.API_URL}/municipio/${busqueda}` )
      .subscribe((res: any) => {
        // console.log(res.array);
        this.municipios = res.array;
      });
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
