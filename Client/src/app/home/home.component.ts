import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerIn:boolean;
  constructor() { }

  ngOnInit(): void {
  }

  register(){
    this.registerIn = !this.registerIn;
  }

  cancelRegitser(event:boolean){
    this.registerIn = event;
  }
}
