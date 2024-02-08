import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentgatewayService } from 'src/app/services/paymentgateway.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-paymentgateway-edit',
  templateUrl: './paymentgateway-edit.component.html',
  styleUrls: ['./paymentgateway-edit.component.css']
})
export class PaymentgatewayEditComponent {

  paymentgatewaylistUrl = "/" + environment.paymentgatewayList

  Id:any
  pgmUrl:any; 
  pgmPublicKey:any;
  pgmPrivateKey:any;
  pgmIsActive:any;  
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
    private router: Router,
    private route: ActivatedRoute
  ) {   
    this.getpaymentgateway(this.route.snapshot.params['id']);
  }

   // get the record particular Payment Gateway Integration
   getpaymentgateway(id: any) {
    this.Id = id;
    this.loading = true
    this.paymentgatewayService.getPGI(id).subscribe({
      next: (data: any) => {
        (this.pgmUrl = data.pgmUrl),  
        (this.pgmPublicKey = data.pgmPublicKey),
        (this.pgmPrivateKey = data.pgmPrivateKey),
        (this.pgmIsActive = data.pgmIsActive)
         this.loading = false
      },
      //error: (e) => console.log(e),
    });
  }
   
  //post for Payment Gateway Integration Edit
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
      this.paymentgatewayService.pgi.id = this.Id;
      this.paymentgatewayService.pgi.adminId = this.adminId;
      this.paymentgatewayService.pgi.pgmUrl = this.pgmUrl;      
      this.paymentgatewayService.pgi.pgmPublicKey = this.pgmPublicKey;
      this.paymentgatewayService.pgi.pgmPrivateKey = this.pgmPrivateKey;      
      this.paymentgatewayService.pgi.pgmIsActive = this.pgmIsActive;

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start Payment Gateway Integration edit service
        this.paymentgatewayService.editPGI().subscribe((res:any) => {
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
