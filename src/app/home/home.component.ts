import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  img1: imagenes [] =[
    {nombre:"Compromiso", src:"../../assets/compromiso.jpg", id:9}, 
    {nombre:"Anillos", src:"../../assets/anillos.jpg", id:2},
    {nombre:"Alinzas", src:"../../assets/alianza.jpg", id:10}
  ];

  img2: imagenes [] =[
    {nombre:"Colgantes", src:"../../assets/colgantes.jpg", id:3}, 
    {nombre:"Pendientes", src:"../../assets/pendientes.jpg", id:8},
    {nombre:"Pulseras", src:"../../assets/pulseras.png", id:4}
  ];

  img3: imagenes [] =[
    {nombre:"Esclavas", src:"../../assets/esclavas.jpg", id:15}, 
    {nombre:"Gemelos", src:"../../assets/gemelos.jpg", id:12},
    {nombre:"Cadenas", src:"../../assets/cadenas.jpg", id:14}
  ];
  constructor(private router: Router) { }

  verJoyas(item: any){
    this.router.navigate([ '/joyas', item ]);
  }

  ngOnInit(): void {
  }

}
 interface imagenes{
   nombre: string;
   src:string;
   id:number;
 }