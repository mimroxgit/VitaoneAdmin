import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentgatewayService } from 'src/app/services/paymentgateway.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-paymentgateway-create',
  templateUrl: './paymentgateway-create.component.html',
  styleUrls: ['./paymentgateway-create.component.css']
})
export class PaymentgatewayCreateComponent {

  paymentgatewaylistUrl = "/" + environment.paymentgatewayList

  pgmUrl:any; 
  pgmPublicKey:any;
  pgmPrivateKey:any;
  pgmIsActive=true;  
  adminId: any;  

  loading = false;
  mes: any;
  response: any;
  nameMessage: any; 
  publicKeyMessage: any; 
  privateKeyMessage: any;  
  errorCount = 0;

  constructor(
    public paymentgatewayService: PaymentgatewayService,
    private router: Router
  ) {   
    
  }
   
  //post for Payment Gateway Integration Create
  onSubmit(form: NgForm) {
    this.errorCount = 0;

    //Url validation
    if (this.pgmUrl == undefined) {
      this.errorCount++;
      this.nameMessage = 'Please enter site url';
    } else {
      if (this.pgmUrl.trim() == '') {
        this.errorCount++;
        this.nameMessage = 'Please enter valid site url';
      } else {       
          this.nameMessage = '';       
      }
    }   
    
    //PublicKey validation
    if (this.pgmPublicKey == undefined) {
      this.errorCount++;
      this.publicKeyMessage = 'Please enter public key';
    } else {
      if (this.pgmPublicKey.trim() == '') {
        this.errorCount++;
        this.publicKeyMessage = 'Please enter valid public key';
      } else {       
          this.publicKeyMessage = '';       
      }
    }   

    //PrivateKey validation
    if (this.pgmPrivateKey == undefined) {
      this.errorCount++;
      this.privateKeyMessage = 'Please enter private key';
    } else {
      if (this.pgmPrivateKey.trim() == '') {
        this.errorCount++;
        this.privateKeyMessage = 'Please enter valid private key';
      } else {       
          this.privateKeyMessage = '';       
      }
    }   
    

    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');

      this.paymentgatewayService.pgi.adminId = this.adminId;
      this.paymentgatewayService.pgi.pgmUrl = this.pgmUrl;      
      this.paymentgatewayService.pgi.pgmPublicKey = this.pgmPublicKey;
      this.paymentgatewayService.pgi.pgmPrivateKey = this.pgmPrivateKey;      
      this.paymentgatewayService.pgi.pgmIsActive = this.pgmIsActive;

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start Payment Gateway Integration create service
        this.paymentgatewayService.createPGI().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.paymentgatewayService.pgi.pgmUrl = '';           
            this.router.navigate([environment.paymentgatewayList]);
          }
        });
      }
    }
  }
}
