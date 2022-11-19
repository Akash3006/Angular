import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl,AccountAction, AccountController} from '../constants/Constants';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpService:HttpClient) { }

  login(model:any){
    return this.httpService.post(BaseUrl+AccountController+AccountAction,model);
  }
}
