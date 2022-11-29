import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, ReplaySubject } from 'rxjs';
import { BaseUrl, AccountController, LoginAction, RegisterAction} from '../constants/Constants';
import { User } from '../_models/User';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpService:HttpClient) { }

  //Buffer
  private currentUserSource = new BehaviorSubject<User|null>(null);
  current$ = this.currentUserSource.asObservable();

  //Login
  login(model:any){
    return this.httpService.post(BaseUrl+AccountController+LoginAction,model).pipe(
      map((response:User)=>{
        const user = response;
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  //Register User 
  register(model:any){
    return this.httpService.post(BaseUrl+AccountController+RegisterAction,model).pipe(
      map((user:User)=>{
        if(user)
        {
          this.setCurrentUser(user);
        }
      })
    );
  }

  //Helper method
  setCurrentUser(user:User){
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    //Empty buffer
    this.currentUserSource.next(null);
  }
}
