import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styles: []
})
export class EnviosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
