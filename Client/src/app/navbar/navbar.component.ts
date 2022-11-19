import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model:any = {};

  constructor(public accountservice:AccountService,private router:Router) { }

  ngOnInit(): void {
   
  }

  login(){
    console.log(this.model);
    this.accountservice.login(this.model).subscribe(response=>{
      this.router.navigateByUrl('/members');
    },error=>{
      console.log(error);      
    });
    
  }

  logout(){
    this.accountservice.logout();
    this.router.navigateByUrl('/');    
  }
}
