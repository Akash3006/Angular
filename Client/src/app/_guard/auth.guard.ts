import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable,map } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private accountService:AccountService) {}

  //Route guard automatically subscribe and unsubscribe the observeable

  canActivate(): Observable<boolean>  {

    return this.accountService.current$.pipe(
      map(user => {
        if(user) return true;
        else{
          console.log('Invalid User');
          return false;
        }
      })
    
      );
  }
  
}
