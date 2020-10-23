import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  }); 

  constructor(private router: Router) { }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
  }

  async onLogin() {

  }

  async onGoogleLogin() {
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
