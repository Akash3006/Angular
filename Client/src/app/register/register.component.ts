import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model:any = {};
  registerForm:FormGroup = new FormGroup({});

  @Output() cancelRegister = new EventEmitter<boolean>();
  constructor(private accountService:AccountService) { }

 
  ngOnInit(): void {

    this.initializeForm();
  }
  initializeForm(){
    //Form Control is a collection inside form group
    this.registerForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password:new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(8)]),
      confirmPassword:new FormControl('',[Validators.required,this.matchValue('password')]),
    });

    //Check if the password field keeps changing then validate confirm password as well
    this.registerForm.controls['password'].valueChanges.subscribe({
      next:()=> {
        //Check value of Confirm password
        this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      }
    });
  }

  //Custom Validator
  matchValue(matchTo:string):ValidatorFn{

    return (control:AbstractControl)=>{
        //Compare the current control value to the specified control value
        return control.value === control.parent?.get(matchTo).value?null:{notMatched:true}
    }

  }

  register(){

    //Log the ouput to check 
    console.log(this.registerForm.value);

    // this.accountService.register(this.model).subscribe(
    //   response=>{
    //     console.log(response);
    //     this.cancel();
    //   },
    //   error=> {
    //     console.log(error);        
    //   }
    // );
  }
  cancel(){
    this.cancelRegister.emit(false);
  }
}
