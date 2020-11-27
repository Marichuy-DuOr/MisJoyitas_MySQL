import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MysqlService } from '../services/mysql.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GraficarService } from './../services/graficar.service';
import { JspdfService } from './../services/jspdf.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styles: []
})
export class PerfilUsuarioComponent implements OnInit {

  public user;
  public estado;

  public municipios;

  public data;

  public ejeX = [];
  public ejeY = [];

  public editUserForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    ape_pat: new FormControl('', Validators.required),
    ape_mat: new FormControl('', Validators.required),
    telefono: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)])
  });

  public editDireccionForm = new FormGroup({
    colonia: new FormControl('', Validators.required),
    calle: new FormControl('', Validators.required),
    id_municipio: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    interior: new FormControl(Validators.nullValidator),
    cp: new FormControl('', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5), Validators.maxLength(5)]),
    busqueda: new FormControl(Validators.nullValidator)
  });

  constructor(private mysqlService: MysqlService,
     private configAlert: NgbAlertConfig,
     private modalService: NgbModal, // para abrir el modal desde el ts
    private graficarService: GraficarService, // genera la gráfica
    private jspdfService: JspdfService) {
    this.estado = '1';
  }

  ngOnInit(): void {
    this.estado = '1';
    this.actualizar();
    document.getElementById('uno').style.display = 'none';
    document.getElementById('dos').style.display = 'none';
  }

  public actualizar() {
    this.mysqlService
      .consulta(`${environment.API_URL}/mainUser-datos`)
      .subscribe((res: any) => {
        console.log(res);
        this.user = res.array[0];
        if (!this.user.interior) {
          this.user.interior = '';
        }
        this.editUserForm.setValue({
          nombre: this.user.nombre,
          ape_pat: this.user.ape_pat,
          ape_mat: this.user.ape_mat,
          telefono: this.user.telefono
        });
        this.editDireccionForm.setValue({
          colonia: this.user.colonia,
          calle: this.user.calle,
          id_municipio: this.user.id_municipio,
          numero: this.user.numero,
          interior: this.user.interior,
          cp: this.user.cp,
          busqueda: this.user.municipio
        });
      });
  }

  public editUser() {
    this.estado = '2';
  }
  public editDireccion() {
    this.estado = '3';
  }
  public regresar() {
    this.estado = '1';
  }

  public editUsuario(form) {
    if (this.editUserForm.valid) {
      const body = {
        nombre: form.nombre,
        ape_pat: form.ape_pat,
        ape_mat: form.ape_mat,
        telefono: form.telefono
      };

      this.mysqlService.cambio(`${environment.API_URL}/usuario`, body)
      .subscribe((res: any) => {
        this.estado = '1';
        document.getElementById('dos').style.display = 'block';
        setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
        this.actualizar();
      });

    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
    }

  }

  public editDirecc(form) {
    if (this.editDireccionForm.valid) {
      const body = {
        colonia: form.colonia,
        calle: form.calle,
        id_municipio: form.id_municipio,
        numero: form.numero,
        interior: form.interior,
        cp: form.cp
      };


      this.mysqlService.cambio(`${environment.API_URL}/direccion`, body)
      .subscribe((res: any) => {
        this.estado = '1';
        document.getElementById('dos').style.display = 'block';
        setTimeout(() => document.getElementById('dos').style.display = 'none', 5000);
        this.actualizar();
      });

    } else {
      document.getElementById('uno').style.display = 'block';
      setTimeout(() => document.getElementById('uno').style.display = 'none', 5000);
    }

  }

  public getMunicipio(busqueda) {
    this.mysqlService.consultaNoT(`${environment.API_URL}/municipio/${busqueda}` )
      .subscribe((res: any) => {
        this.municipios = res.array;
      });
  }

  downloadPDF() {
    this.jspdfService.downloadPDF('htmlData');
  }

  open(content) {
      this.ejeX = [];
      this.ejeY = []; // quita los datos anteriores en caso de haberlos

      this.modalService.open(content, { size: 'lg' }); // abre el modal y define que tamaño va a tener
      this.mysqlService
      .consulta(`${environment.API_URL}/reporte-compras1/${11}/${2020}`)
      .subscribe((res: any) => {
        this.data = res.array;
        res.array.map(o => {
          this.ejeX.push(o.proveedor);
          this.ejeY.push(o.no_compras);
        });
        // crea la grafica, debe ir despues de abrir el modal
        this.graficarService.create(this.ejeX, this.ejeY, 'bar', 'bar', 'Reporte mensual de compras por proveedor');
      });
    
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  cerrar(alerta: string) {
    document.getElementById(alerta).style.display = 'none';
  }
}
