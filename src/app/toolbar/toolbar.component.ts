import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../shared/models/user.interface';
import { AuthService } from './../authentication/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: []
})
export class ToolbarComponent implements OnInit {

  public user$: Observable<UserResponse> = this.authSvc.user$;

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }

}
