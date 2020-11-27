import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class GraficarService {

  ctx: any;

  public colores = [ // colores del las barras del gráfico
    'rgba(255, 195, 18, 0.4)',
    'rgba(18, 203, 196, 0.4)',
    'rgba(237, 76, 103, 0.4)',
    'rgba(163, 203, 56, 0.4)',
    'rgba(217, 128, 250, 0.4)',
    'rgba(238, 90, 36, 0.4)',
    'rgba(6, 82, 221, 0.4)',
    'rgba(131, 52, 113, 0.4)',
    'rgba(234, 32, 39, 0.4)',
    'rgba(27, 20, 100, 0.4)',
    'rgba(111, 30, 81, 0.4)',
    'rgba(196, 229, 56, 0.4)',
    'rgba(253, 167, 223, 0.4)',
    'rgba(247, 159, 31, 0.4)',
    'rgba(18, 137, 167, 0.4)',
    'rgba(181, 52, 113, 0.4)',
    'rgba(0, 148, 50, 0.4)',
    'rgba(153, 128, 250, 0.4)',
    'rgba(87, 88, 187, 0.4)'
  ];

  constructor() { }

  // ejeX   -> Datos en la base de la gráfica
  // ejeY   -> Datos con los que se compara el eje Y
  // id     -> el id de la etiqueta en html donde se hubica el grafico
  // tipo   -> tipo de grafico, bar o pie, hay mas pero no los he probado
  // titulo -> etiqueta en la parte de arriba del grafico
  create(ejeX, ejeY, id, tipo, titulo) {
    this.shuffle(this.colores);
    this.ctx = document.getElementById(id);
    this.ctx.getContext('2d');
    const myChart = new Chart(this.ctx, {
      type: tipo,
      data: {
        labels: ejeX,
        datasets: [{
          label: titulo,
          data: ejeY,
          backgroundColor: this.colores,
          borderColor: this.colores,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  shuffle(array) { // mezcla los colores para que se usen diferentes cada vez que se genera un gráfico
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  quitaAuxiliares(ejeX, ejeY, id, tipo, titulo) {
    ejeX.splice( 18 , 1 );
    ejeX.splice( 11, 1 );
    ejeX.splice( 1, 1 );
    ejeX.splice( 0, 1 );
    ejeY.splice( 18 , 1 );
    ejeY.splice( 11, 1 );
    ejeY.splice( 1, 1 );
    ejeY.splice( 0, 1 );
    this.create(ejeX, ejeY, id, tipo, titulo);
  }
}
