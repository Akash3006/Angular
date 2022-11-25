import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm:NgForm|undefined;

  //Host event listner(Browser)
  @HostListener('window:beforeunload',['$event']) unloadNotificaiton($event:any){
    if(this.editForm?.dirty)
    $event.returnValue = true;
  }
  user:User;
  member:Member;

  constructor(private accountService:AccountService,private memberService:MembersService) {
    this.accountService.current$.pipe(take(1)).subscribe(
      {
        next:user=> this.user = user
      }
    );
   }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.user.username).subscribe({
      next:member=>this.member = member
    });
  }

  updateDetails(){
    this.memberService.updateMember(this.editForm.value).subscribe({
      next: _ =>{
        this.editForm?.reset(this.member);
      }
    })  
  }
}
