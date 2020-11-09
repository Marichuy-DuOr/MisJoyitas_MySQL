import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styles: []
})
export class PagoComponent implements OnInit {

  dir=true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
