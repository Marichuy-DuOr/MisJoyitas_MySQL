import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambios',
  templateUrl: './cambios.component.html',
  styles: []
})
export class CambiosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
