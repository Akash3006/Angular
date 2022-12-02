import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { BaseUrl, UserController } from '../constants/Constants';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  members:Member[]=[];
  paginatedResults:PaginatedResult<Member[]> = new PaginatedResult<Member[]>;
  constructor(private http:HttpClient) { }

  getMembers(userParams:UserParams){

    //Parameters 
    let params = this.getPagination(userParams.pageNumber,userParams.pageSize);
    params = this.setParams(params, userParams);
    return this.getPaginatedResult<Member[]>(BaseUrl + UserController,params);
  }

  private setParams(params: HttpParams, userParams: UserParams) {
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy',userParams.orberBy);
    return params;
  }

  private getPaginatedResult<T>(url:string,params: HttpParams) {

    const paginatedResult:PaginatedResult<T> = new PaginatedResult<T>; 

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(
        response => {
          if (response) {
            paginatedResult.result = response.body;
          }

          const pagination = response.headers.get('Pagination');
          if (pagination) {
            paginatedResult.pagination = JSON.parse(pagination);
          }

          return paginatedResult;
        }
      )
    );
  }

  private getPagination(page: number, itemsPerpage: number) {
    let params = new HttpParams();

      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerpage);
    
    return params;
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

  deletePhoto(photoId:number){
    return this.http.delete(BaseUrl+UserController+'/delete-photo/'+photoId,{});
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
