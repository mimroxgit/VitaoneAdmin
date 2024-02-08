import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Forgot, Login, Otpverify, Resetpassword } from '../models/login.model';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
    
  }

  //add model
  userlogin: Login = new Login();
  userForgot: Forgot = new Forgot();  
  otp: Otpverify = new Otpverify();
  userReset: Resetpassword = new Resetpassword();

  //Login
  postLogin() {
    return this.http.post(baseURL + 'AdminAccount/Login', this.userlogin);
  }
    
  //ForgotPassword
  postForgotPassword() {
    return this.http.post(baseURL + 'AdminAccount/ForgotPassword', this.userForgot);
  }

  //ResetPassword link
  resetPassword(id: any) {
    return this.http.get(`${baseURL + 'AdminAccount/VerifyResetId?resetId='}${id}`);
  }
  
  //UpdatePassword
  postResetPassword() {
    return this.http.post(baseURL + 'AdminAccount/ResetPassword', this.userReset);
  }
  
}
