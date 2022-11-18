import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { BaseUrl,AccountAction, AccountController} from '../constants/Constants';
import { User } from '../_models/User';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpService:HttpClient) { }

  //Buffer
  private currentUserSource = new ReplaySubject<User>(1);
  current$ = this.currentUserSource.asObservable();

  login(model:any){
    return this.httpService.post(BaseUrl+AccountController+AccountAction,model).pipe(
      map((response:User)=>{
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          //setting up the buffer 
          this.currentUserSource.next(user);//setup the current response 
        }
      })
    );
  }

  //Helper method
  setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }
  logout(){
    localStorage.removeItem('user');
    //Empty buffer
    this.currentUserSource.next(null);
  }
}
