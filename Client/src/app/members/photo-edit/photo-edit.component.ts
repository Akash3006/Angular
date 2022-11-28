import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
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

  constructor(private accountService:AccountService) {
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
