import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css']
})
export class ResetpwdComponent {

  resetId: any;
  Password: any;
  confPassword: any;

  loading = false;
  pageloading = false;
  passwordMessage: any;
  confpasswordMessage: any;
  mes: any;
  errorCount = 0;
  resetpage = false;
  Failed = false;
  response: any;
  dosnotmatch: any;

  constructor(
    public loginservice: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loadAlluser(this.route.snapshot.params['resetId']);
  }

  //reset password
  onSubmit(from: NgForm) {

    this.errorCount = 0;

    //Password validation
    if (this.Password == undefined) {
      this.errorCount++;
      this.passwordMessage = 'Please enter password';
    } else {
      this.passwordMessage = '';
      if (this.Password.trim() == '') {
        this.errorCount++;
        this.passwordMessage = 'Please enter valid password';
      }
    }
    //confPassword validation
    if (this.confPassword == undefined) {
      this.errorCount++;
      this.confpasswordMessage = 'Please enter confirm password';
    } else {
      this.confpasswordMessage = '';
      if (this.confPassword.trim() == '') {
        this.errorCount++;
        this.confpasswordMessage = 'Please enter valid confirm password';
      }
    }

    if (this.Password != this.confPassword) {
      this.errorCount++;
      this.dosnotmatch = 'Password does not match';
    }
    if (this.errorCount == 0) {
      this.loginservice.userReset.resetId = this.resetId;
      this.loginservice.userReset.Password = this.Password;
      
      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        //resetpassword service
        this.loginservice.postResetPassword().subscribe({
          next: (data: any) => {
            this.response = data;
            if (this.response.responseMessage != 'Success') {
              this.mes = this.response.responseMessage;
              this.loading = false;
            } else {
              this.loading = false;
              this.loginservice.userReset.Password = '';
              this.router.navigate(['/login']);
            }
          },
        });
      }
    }
  }

  // get the record
  loadAlluser(id: any) {
    this.pageloading = true;
    this.Failed = false;
    this.resetpage = false;
    this.loginservice.resetPassword(id).subscribe({
      next: (data: any) => {
        this.response = data;
        
        this.resetId = data.resetId;
        if (this.response.responseMessage != 'Success') {
          this.resetpage = false;
          this.pageloading = false;
          this.Failed = true
        } else {
          this.resetpage = true;
          this.Failed = false;
          this.pageloading = false;
        }        
      },
      //error: (e) => console.log(e),
    });
  }
}
