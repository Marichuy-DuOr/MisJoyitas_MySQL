import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../shared/models/user.interface';
import { AuthService } from './../authentication/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  public user$: Observable<UserResponse> = this.authSvc.user$;

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  buscarJoya(nomjoya: string) {
    this.router.navigate(['/buscador', nomjoya]);
  }

}
