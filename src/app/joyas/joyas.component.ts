import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joyas',
  templateUrl: './joyas.component.html',
  styles: []
})
export class JoyasComponent implements OnInit {

  constructor(private router: Router) { }

  verJoya(item: any){

    this.router.navigate([ '/joya', item ]);

  }
  ngOnInit(): void {
  }

}
