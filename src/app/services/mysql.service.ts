import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MysqlService {

  constructor(private authSvc: AuthService, private httpClient: HttpClient) {}

  consulta(url: string) {
    const elUser = this.authSvc.userValue;

    return this.httpClient.get(url, {
      headers: new HttpHeaders().set(
       'user_token',
        elUser.token
      ),
    });
  }

  consultaId(url: string) {
    const elUser = this.authSvc.userValue;

    return this.httpClient.get(url, {
      headers: new HttpHeaders().set(
       'user_token',
        elUser.token
      ),
    });
  }

  consultaNoT(url: string) {
    return this.httpClient.get(url);
  }

  delete(url: string) {
    const elUser = this.authSvc.userValue;

    return this.httpClient.delete(url, {
      headers: new HttpHeaders().set(
       'user_token',
        elUser.token
      ),
    });
  }

  cambio(url: string, body: any) {
    const elUser = this.authSvc.userValue;

    return this.httpClient.put(url, body, {
      headers: new HttpHeaders().set(
       'user_token',
        elUser.token
      ),
    });
  }

  alta(url: string, body: any) {
    const elUser = this.authSvc.userValue;

    return this.httpClient.post(url, body, {
      headers: new HttpHeaders().set(
       'user_token',
        elUser.token
      ),
    }).toPromise();
  }

  altaNoT(url: string, body: any) {
    return this.httpClient.post(url, body).toPromise();
  }

  consultaTipo(url: string) {
    const elUser = this.authSvc.userValue;

    return this.httpClient.get(url, {
      headers: new HttpHeaders().set(
       'user_token',
        elUser.token
      ),
    });
  }
}
