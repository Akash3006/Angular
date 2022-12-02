import { Component, OnInit } from '@angular/core';
import { ResolveEnd } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/User';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  genderList=[{value:'male',display:'Male'},{value:'female',display:'Female'}];
  members:Member[];
  pagination:Pagination;
  userParams:UserParams;
  user:User;
  // members$:Observable<Member[]>;
  constructor(private memberservice:MembersService,private accountService:AccountService) {

    this.accountService.current$.pipe(take(1)).subscribe({
      next:user=>{
        if(user)
        {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      }

    });
   }

  ngOnInit(): void {
    //automatice subscribing using async pipe
    this.loadMembers();
    // this.members$ = this.memberservice.getMembers();    
  }

  loadMembers()
  {
    this.memberservice.getMembers(this.userParams).subscribe({
      next:response=>{
        if(response.result && response.pagination)
        {
            this.members = response.result;
            this.pagination = response.pagination;
        }
      }
    });
  }
  resetFilters(){
    if(this.user)
    {
      this.userParams = new UserParams(this.user);
      this.loadMembers();
    }
  }
  pageChanged(event:any){

    if(this.userParams && this.userParams?.pageNumber != event.page)
    {
      this.userParams.pageNumber = event.page;
      this.loadMembers();
    }
  }


}
