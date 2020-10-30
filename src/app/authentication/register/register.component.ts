import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {


  public newUserForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    ape_pat: new FormControl('', Validators.required),
    ape_mat: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]),
    contrasena: new FormControl('', Validators.required),
    contrasenaVerf: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) {
    this.newUserForm.setValue({
      nombre: '',
      ape_pat: '',
      ape_mat: '',
      correo: '',
      telefono: '',
      contrasena: '',
      contrasenaVerf: ''
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
        contrasena: form.contrasena
      };

      if (body.contrasena === form.contrasenaVerf) {
        this.authService.register(body).then((data) => {
          if (!data['success']) {
            document.getElementById('tres').style.display = 'block';
            setTimeout(() => document.getElementById('tres').style.display = 'none', 5000);
          } else {
            this.router.navigate(['/login']);
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

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
