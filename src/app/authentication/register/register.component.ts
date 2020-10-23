import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordVerf: new FormControl('', Validators.required)
  });

  constructor( private router: Router) { }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
  }

  async onRegister() {
    

  }

  async onGoogleLogin() {
    
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
