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

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'joyas/:id', component: JoyasComponent},
  {path: 'joya/:id', component: JoyaComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: 'buscador', component: BuscadorComponent},
  {path: 'wiki', component: WikiComponent},
  {path: 'guianillos', component: GuiaAnillosComponent},
  {path: 'envios', component: EnviosComponent},
  {path: 'cambios', component: CambiosComponent},
  {path: 'pagos', component: FormasPagoComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
