import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { BaseUrl, UserController } from '../constants/Constants';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  members:Member[]=[];
  constructor(private http:HttpClient) { }

  getMembers(){
    //Persist members
    if(this.members.length > 0) return of(this.members);

    return this.http.get<Member[]>(BaseUrl+UserController).pipe(
      map(members => {
        this.members = members;
      return members;
    })
    );
  }

  getMember(username:string){
    //Persist member
    const member = this.members.find(x=> x.username == username);

    if(member) return of(member);
    return this.http.get<Member>(BaseUrl+UserController+'/'+username);
  }

  updateMember(member:Member){
    return this.http.put(BaseUrl+UserController,member).pipe(
      map(()=>{
        //Persist member updated data
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index],...member}
      })
    );
  }

  setMainPhoto(photoId:number){
    return this.http.put(BaseUrl+UserController+'/set-main-photo/'+photoId,{});
  }
  // getHttpOptions(){
  //   var userString = localStorage.getItem('user');
  //   if(!userString) return;
  //   const user = JSON.parse(userString);
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization:'Bearer '+ user.token
  //     })
  //   }
  // } //This method was discarded, An interceptor was added to add token with request
}
