import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { CambiosComponent } from './cambios/cambios.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ContactoComponent } from './contacto/contacto.component';
import { EnviosComponent } from './envios/envios.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { FooterComponent } from './footer/footer.component';
import { FormasPagoComponent } from './formas-pago/formas-pago.component';
import { GuiaAnillosComponent } from './guia-anillos/guia-anillos.component';
import { JoyaComponent } from './joya/joya.component';
import { JoyasComponent } from './joyas/joyas.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WikiComponent } from './wiki/wiki.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';

import { CanGuard } from './authentication/guards/can-guard';
import { CanAdminGuard } from './authentication/guards/can-admin-guard';
import { HttpClientModule } from '@angular/common/http';
import { ProductosComponent } from './admin/productos/productos.component';
import { OpcionesAdminComponent } from './admin/opciones-admin/opciones-admin.component';
import { CambiarRolesComponent } from './admin/cambiar-roles/cambiar-roles.component';
import { PagoComponent } from './pago/pago.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { ProveedoresComponent } from './admin/proveedores/proveedores.component';
import { PreciosProveedoresComponent } from './admin/precios-proveedores/precios-proveedores.component';
import { ComprasComponent } from './admin/compras/compras.component';
import { ConsultaComprasComponent } from './admin/consulta-compras/consulta-compras.component';
import { ReportesComprasComponent } from './admin/reportes-compras/reportes-compras.component';
import { VentaFinalizadaComponent } from './venta-finalizada/venta-finalizada.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    BuscadorComponent,
    CambiosComponent,
    CarritoComponent,
    ContactoComponent,
    EnviosComponent,
    FacturacionComponent,
    FooterComponent,
    FormasPagoComponent,
    GuiaAnillosComponent,
    JoyaComponent,
    JoyasComponent,
    NavbarComponent,
    ToolbarComponent,
    WikiComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ProductosComponent,
    OpcionesAdminComponent,
    CambiarRolesComponent,
    PerfilUsuarioComponent,
    ProveedoresComponent,
    PreciosProveedoresComponent,
    ComprasComponent,
    ConsultaComprasComponent,
    PagoComponent,
    PerfilUsuarioComponent,
    ReportesComprasComponent,
    VentaFinalizadaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    CanGuard,
    CanAdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
