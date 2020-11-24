import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venta-finalizada',
  templateUrl: './venta-finalizada.component.html',
  styles: []
})
export class VentaFinalizadaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
