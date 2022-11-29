import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import {BaseUrl} from '../../constants/Constants'
@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {

  @Input()member:Member;
  uploader:FileUploader;
  hasBaseDropZoneOver= false;
  baseUrl = BaseUrl;
  user :User;

  constructor(private accountService:AccountService,private memberService:MembersService) {
    this.accountService.current$.pipe(take(1)).subscribe({
      next: user=>{if(user) this.user = user}
    });
   }

   ngOnInit(): void {

    this.initializeUploader();
  }

  fileOverBase(e:any)
  {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo:Photo){
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: ()=>{
        if(this.user && this.member)
        {
          //settting the main photo along with the nave photo
          this.user.photoUrl = photo.url

          //updating the user 
          this.accountService.setCurrentUser(this.user);

          //Changing the card and user detail photo 
          this.member.photoUrl = photo.url

          //Make the photo as main 
          this.member.photos.forEach(
            p=>{
              if(p.isMain) p.isMain =false;
              
              if(p.id == photo.id) p.isMain =true;
            }
          )
        }
      }
    });
  }
  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl+'users/add-photo',
      authToken:'Bearer '+this.user.token,
      isHTML5:true,
      autoUpload:false,
      allowedFileType:['image'],
      removeAfterUpload:true,
      maxFileSize:10*1024*1024
    });

    this.uploader.onAfterAddingFile = (file)=>{
      file.withCredentials = false
    }

    //After successful upload
    this.uploader.onSuccessItem = (item,response,status,headers)=>{
      if(response)
      {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
      }
    }
  }
}
