import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { WikiComponent } from './wiki/wiki.component';
import { JoyaComponent } from './joya/joya.component';
import { JoyasComponent } from './joyas/joyas.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { GuiaAnillosComponent } from './guia-anillos/guia-anillos.component';
import { EnviosComponent } from './envios/envios.component';
import { CambiosComponent } from './cambios/cambios.component';
import { FormasPagoComponent } from './formas-pago/formas-pago.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ProductosComponent } from './admin/productos/productos.component';
import { CambiarRolesComponent } from './admin/cambiar-roles/cambiar-roles.component';
import { PagoComponent } from './pago/pago.component';
import { ProveedoresComponent } from './admin/proveedores/proveedores.component';
import { PreciosProveedoresComponent } from './admin/precios-proveedores/precios-proveedores.component';
import { ComprasComponent } from './admin/compras/compras.component';
import { ConsultaComprasComponent } from './admin/consulta-compras/consulta-compras.component';
import { ReportesComprasComponent } from './admin/reportes-compras/reportes-compras.component';
import { VentaFinalizadaComponent } from './venta-finalizada/venta-finalizada.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { FacturacionComponent } from './facturacion/facturacion.component';

import { CanGuard } from './authentication/guards/can-guard';
import { CanAdminGuard } from './authentication/guards/can-admin-guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'joyas/:id', component: JoyasComponent, canActivate: [CanGuard]},
  {path: 'joya/:id', component: JoyaComponent, canActivate: [CanGuard]},
  {path: 'contacto', component: ContactoComponent},
  {path: 'carro', component: CarritoComponent},
  {path: 'pagar', component: PagoComponent},
  {path: 'ventaFinalizada', component: VentaFinalizadaComponent},
  {path: 'perfil-usuario', component: PerfilUsuarioComponent, canActivate: [CanGuard]},
  {path: 'facturacion', component: FacturacionComponent},
  {path: 'buscador', component: BuscadorComponent},
  {path: 'wiki', component: WikiComponent},
  {path: 'guianillos', component: GuiaAnillosComponent},
  {path: 'envios', component: EnviosComponent},
  {path: 'cambios', component: CambiosComponent},
  {path: 'pagos', component: FormasPagoComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'productos', component: ProductosComponent, canActivate: [CanAdminGuard]},
  {path: 'proveedores', component: ProveedoresComponent, canActivate: [CanAdminGuard]},
  {path: 'precios-proveedores', component: PreciosProveedoresComponent, canActivate: [CanAdminGuard]},
  {path: 'cambiar-roles', component: CambiarRolesComponent, canActivate: [CanAdminGuard]},
  {path: 'compras', component: ComprasComponent, canActivate: [CanAdminGuard]},
  {path: 'consulta-compras', component: ConsultaComprasComponent, canActivate: [CanAdminGuard]},
  {path: 'reportes-compras', component: ReportesComprasComponent, canActivate: [CanAdminGuard]},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
