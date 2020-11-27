import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from '../shared/models/user.interface';
import { AuthService } from './../authentication/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

  public user$: Observable<UserResponse> = this.authSvc.user$;

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

}
