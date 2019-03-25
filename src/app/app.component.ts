import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rock Paper Scissors Game';
  constructor( private router: Router ) { }
  StartGame:boolean=false;
  verManvsMan() {

    this.router.navigate([ '/manvsman'  ]);
    this.StartGame = true;
  }

  verManvsMachine() {

    this.router.navigate([ '/manvsmachine'  ]);
    this.StartGame = true;
  }
  BackButton(){
    this.router.navigate([ '/'  ]);
    this.StartGame = false;
  }
}
