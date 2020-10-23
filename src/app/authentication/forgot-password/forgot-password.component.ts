import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: []
})
export class ForgotPasswordComponent implements OnInit {

  userEmail = new FormControl('', [Validators.required, Validators.email]);

  constructor() { }

  ngOnInit(): void {
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
  }

  async onReset() {}

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }

}
