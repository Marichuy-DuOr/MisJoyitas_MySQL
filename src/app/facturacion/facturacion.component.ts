import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styles: []
})
export class FacturacionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
