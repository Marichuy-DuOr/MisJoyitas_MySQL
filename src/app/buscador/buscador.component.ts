import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MysqlService } from './../services/mysql.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: []
})
export class BuscadorComponent implements OnInit {

  joyas;
  bandera: boolean;
  nomjoya: string;

  constructor( private activatedRoute: ActivatedRoute, private mysqlService: MysqlService ) {

    this.activatedRoute.params.subscribe( params => {
      this.nomjoya = params['nomjoya'];
      this.bandera = false;
      this.buscarart();
    });

  }

  buscarart() {
    this.mysqlService
      .consulta(`${environment.API_URL}/producto-id-nombre/${this.nomjoya}`)
      .subscribe((res: any) => {
        this.joyas = res.array;
      });
  }

  ngOnInit(): void {
  }

}
