import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class ForgotpwdComponent {

  loginurl = "/"+environment.login
  username: any;

  loading = false;
  forgotUser: any;
  emailMessage: any;
  slrEmailMessage: any;
  passwordMessage: any;
  submitted = false;
  errorCount = 0;
  textClass = '';
  mes: any;

  constructor(public loginservice: LoginService, private router: Router) {}

  //check Email validation
  validateEmail(emailAddress: any) {
    var pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var res = pattern.test(emailAddress);
    return res;
  }


  //Forgot Password
  onSubmit(from: NgForm) {
    this.errorCount = 0;

    this.submitted = true;

   //Username Validation
   if (this.username == undefined) {
    this.errorCount++;
    this.emailMessage = 'Please enter email';
  } else {
    if (this.username.trim() == '') {
      this.errorCount++;
      this.emailMessage = 'Please enter valid email';
    } else {     
        var validateEmail = this.validateEmail(this.username);
        if (validateEmail == false) {
          this.errorCount++;
          this.emailMessage = 'Please enter valid email';
        } else {
          this.emailMessage = '';
        }
      }    
  }

    if (this.errorCount == 0) {
      this.loginservice.userForgot.email = this.username;

      if (this.loading == false) {
        this.loading = true;
        //forgotpassword service
        this.loginservice.postForgotPassword().subscribe({
          next: (data: any) => {
            this.mes = '';
            this.forgotUser = data;            
            if (this.forgotUser.responseMessage != 'Success') {
              this.textClass = 'text-danger';
              
              this.mes = this.forgotUser.responseMessage;
              this.loading = false;
            } else {
              this.username = '';   
              this.textClass = 'text-success';
              this.mes =
                'An email has been sent to the given email. Please check your email to reset your password.';
               
              this.loading = false;
                            
              //this.router.navigate([''])
            }
          },
        });
      }
    }
  }
}
