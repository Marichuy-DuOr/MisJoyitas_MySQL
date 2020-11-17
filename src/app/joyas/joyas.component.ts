import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../services/mysql.service';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-joyas',
  templateUrl: './joyas.component.html',
  styles: []
})
export class JoyasComponent implements OnInit {

  public productos = [];
  public t =[" ", "Joyas", "Anillos", "Colgantes", "Pulseras", "Collares", "Broches", "Cadenas", "Pendientes",
              "Compromiso", "Alianzas", "Hombre", "Gemelos", "Collares", "Cadenas", "Esclavas", "Anillos", "Pendientes",
            "Niños", "Anillos", "Pulseras", "Colgantes", "Pendientes"];
  public tp;

  constructor(private router: Router, 
    public activatedRoute: ActivatedRoute, 
    private mysqlService: MysqlService, 
    public carritoService: CarritoService) {
    this.activatedRoute.params.subscribe( params => {
      this.productos = [];
      console.log(params['id']);
      if ( params['id'] === '1') {
        this.tp = this.t[0];
        this.consulta();
      } else if ( params['id'] === '12' ) {
        for (let i = 12; i < 18; i++) {
          this.consultaTipo( i.toString() );
          this.tp = this.t[i];
        }
      } else if ( params['id'] === '19' ) { 
        for (let i = 19; i < 23; i++) {
          this.consultaTipo( i.toString() );
          this.tp = this.t[i];
        }
      } else {
        this.consultaTipo( params['id'] );
        this.tp = this.t[params['id']];
      }
    });
   }

   public consultaTipo(tipo: string){
    this.mysqlService.consultaTipo(`${environment.API_URL}/productos/${tipo}`)
    .subscribe((res: any) => {
      console.log(res);
      this.productos = res.id;
      console.log(this.productos);
    });
   }

   public consulta(){
    this.mysqlService.consulta(`${environment.API_URL}/productos`)
    .subscribe((res: any) => {
      console.log(res);
      this.productos = res.array;
      console.log(this.productos);
    });
   }

   alta(id: string){
      this.mysqlService.consultaId(`${environment.API_URL}/producto/${id}`)
      .subscribe((res: any) => {
        res.id.forEach((existenciaData : any) => {
            if (Number(existenciaData.existencia) > 0) {
              let data ={
                  id_producto: id,
                  cantidad: 1
              };
              this.mysqlService.alta(`${environment.API_URL}/carrito`, data)
              .then((laData) => {
                document.getElementById('uno').style.display = 'block';
                setTimeout(() => document.getElementById('uno').style.display = 'none', 2000); 
              })
              .catch((err) => {
                console.log(err);
              });

            } else {
              document.getElementById('dos').style.display = 'block';
              setTimeout(() => document.getElementById('dos').style.display = 'none', 2000);
            }
        });
      });
    }
  
    cerrar(alerta: string) {
      document.getElementById(alerta).style.display = 'none';
    }

  ngOnInit(): void {
  }

}
