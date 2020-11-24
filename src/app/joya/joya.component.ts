import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MysqlService } from '../services/mysql.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-joya',
  templateUrl: './joya.component.html',
  styles: []
})
export class JoyaComponent implements OnInit {

  joya: any;
  @Input() idDoc: any;
  public material;
  public bandera;

  cantidadForm = new FormGroup({
    cantidad: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(2)])
  });

  constructor(private activatedRoute: ActivatedRoute,
              private mysqlService: MysqlService,
              private configAlert: NgbAlertConfig) {
                configAlert.dismissible = true;
                this.activatedRoute.params.subscribe( params => {
                  this.idDoc = params['id'];
                });
               }

  ngOnInit(): void {
    this.mysqlService.consultaId(`${environment.API_URL}/producto/${this.idDoc}` )
    .subscribe((res: any) => {
      console.log(res);
      this.joya = res.id[0];
      if (this.joya.material === 1){
        this.material = "Plata ley 925";
      } else{
        this.material = "Oro 10k";
      }

      if (this.joya.tipo === 2){
          this.bandera = true;
      }else{
        this.bandera = false;
      }
    });
  }

  alta(id: string){
    if(this.cantidadForm.valid){
      this.mysqlService.consultaId(`${environment.API_URL}/producto/${id}`)
      .subscribe((res: any) => {
        res.id.forEach((existenciaData : any) => {
            const { cantidad } = this.cantidadForm.value;
            if (Number(existenciaData.existencia) >= cantidad) {
              let data ={
                id_producto: id,
                cantidad: cantidad
            };
            this.mysqlService.alta(`${environment.API_URL}/carrito`, data)
            .then((laData) => {
              document.getElementById('dos').style.display = 'block';
              setTimeout(() => document.getElementById('dos').style.display = 'none', 2000); 
            })
            .catch((err) => {
              console.log(err);
            });
            } else {
              document.getElementById('tres').style.display = 'block';
              setTimeout(() => document.getElementById('tres').style.display = 'none', 1000);
            }
        });
      });
    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
    }
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }
}
