import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl, UserController } from '../constants/Constants';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http:HttpClient) { }

  getMembers(){

    return this.http.get<Member[]>(BaseUrl+UserController, this.getHttpOptions());
  }

  getMember(username:string){
    return this.http.get<Member>(BaseUrl+UserController+'/'+username,this.getHttpOptions());
  }

  getHttpOptions(){
    var userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    return {
      headers: new HttpHeaders({
        Authorization:'Bearer '+ user.token
      })
    }
  }
}