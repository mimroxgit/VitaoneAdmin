import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  forgotPasswordurl = "/"+environment.forgotPassword
  slrmEmail: any;
  slrmPassword: any;

  submitted = false;
  loading = false;
  loginuser: any;
  mes: any;
  emailMessage: any;
  slrEmailMessage: any;
  passwordMessage: any;
  errorCount = 0;
  token: string | undefined;

  constructor(public loginservice: LoginService, private router: Router) {
    this.token = undefined;    
    let uId = localStorage.getItem('userId')
    if(uId!=null)
    {
      this.router.navigate(['/dashboard'])
    }
  }

  //check Email validation
  validateEmail(emailAddress: any) {
    var pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var res = pattern.test(emailAddress);
    return res;
  } 

  //Login
  onSubmit(form: NgForm) {
    this.errorCount = 0;

    this.submitted = true;

    //Username Validation
    if (this.slrmEmail == undefined) {
      this.errorCount++;
      this.emailMessage = 'Please enter email';
    } else {
      if (this.slrmEmail.trim() == '') {
        this.errorCount++;
        this.emailMessage = 'Please enter valid email';
      } else {       
          var validateEmail = this.validateEmail(this.slrmEmail);
          if (validateEmail == false) {
            this.errorCount++;
            this.emailMessage = 'Please enter valid email';
          } else {
            this.emailMessage = '';
          }        
      }
    }

    //Password validation
    if (this.slrmPassword == undefined) {
      this.errorCount++;
      this.passwordMessage = 'Please enter password';
    } else {
      this.passwordMessage = '';
      if (this.slrmPassword.trim() == '') {
        this.errorCount++;
        this.passwordMessage = 'Please enter valid password';
      }
    }

    //Captcha validation
    // if (form.invalid) {
    //   for (const control of Object.keys(form.controls)) {
    //     form.controls[control].markAsTouched();
    //     this.errorCount++;
    //   }
    // }

    if (this.errorCount == 0) {
      this.loginservice.userlogin.username = this.slrmEmail;
      this.loginservice.userlogin.password = this.slrmPassword;

      if (this.loading == false) {
        this.loading = true;
        //Login service
        this.loginservice.postLogin().subscribe({
          next: (data: any) => {
            this.mes = '';
            this.loginuser = data;            
            if (this.loginuser.responseMessage != 'Success') {
              this.mes = this.loginuser.responseMessage;
              this.loading = false;
            } else {                          
              this.loading = false;
              localStorage.setItem('user',this.loginuser.name)
              localStorage.setItem('email',this.loginuser.email)              
              localStorage.setItem('userId',this.loginuser.id)
              localStorage.setItem('loginToken',this.loginuser.token)                            
              
              this.loginservice.userlogin.username = '';
              this.loginservice.userlogin.password = '';
              this.router.navigate([environment.home])
            }
          },
        });
      }
    }
  }
  iseye=false
  psdType='password';
  oneye(){
    if(this.iseye==false)
    {
      this.iseye=true;
      this.psdType='text';
    }
    else{
      this.iseye=false;
      this.psdType='password';
    }
  }
}
