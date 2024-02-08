import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { WebpagesService } from 'src/app/services/webpages.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-wabpages',
  templateUrl: './wabpages.component.html',
  styleUrls: ['./wabpages.component.css']
})
export class WabpagesComponent {

  id:any
  dpmAboutUs:any;
  dpmContactUs:any;
  dpmTerms:any;
  dpmPrivacyPolicy:any;
  dpmFmDoctor:any;
  dpmFmNutritionist:any;
  dpmReturn:any;
  dpmRefundPolicy:any
  sellerId:any;
  webdetails:any;
  

  response:any;
 
  mes:any;
  webloading=false;
  sId: any;
  pimDescription:any;
  @Input() Isshowlabeleditor = true;
  @Input() Isshoweditor = true;

  constructor(
    private toastr:ToastrService,
    private router:Router,
    public webpagesservice:WebpagesService
  ){
    this.webdetailslist()
  }

  //get the list from accountdetailslist
  private webdetailslist() {
    this.sId = localStorage.getItem('userId');
    this.webdetails = null;
    this.webloading      =true
    this.webpagesservice.getwebpagesdetails(this.sId).subscribe({
      next: (data) => {        
        this.webdetails = data; 
        this.id = this.webdetails.id;
        this.dpmAboutUs = this.webdetails.dpmAboutUs
        this.dpmContactUs = this.webdetails.dpmContactUs
        this.dpmTerms = this.webdetails.dpmTerms         
        this.dpmPrivacyPolicy = this.webdetails.dpmPrivacyPolicy  
        this.dpmFmDoctor = this.webdetails.dpmFmDoctor  
        this.dpmFmNutritionist  =this.webdetails.dpmFmNutritionist  
        this.dpmReturn = this.webdetails.dpmReturn  
        this.dpmRefundPolicy = this.webdetails.dpmRefundPolicy
        
        this.webloading      =false
      },
     // error: (e) => console.log(e),
    });
  }

   //post for accountdetails Update
   onSubmit(form: NgForm) {      

      this.webpagesservice.web.id = this.id;
      this.webpagesservice.web.practitionerId = "000000000000000000000000";
      this.webpagesservice.web.dpmAboutUs = this.dpmAboutUs;
      this.webpagesservice.web.dpmContactUs = this.dpmContactUs;
      this.webpagesservice.web.dpmTerms = this.dpmTerms;
      this.webpagesservice.web.dpmPrivacyPolicy = this.dpmPrivacyPolicy; 
      this.webpagesservice.web.dpmFmDoctor = this.dpmFmDoctor;
      this.webpagesservice.web.dpmFmNutritionist = this.dpmFmNutritionist;
      this.webpagesservice.web.dpmReturn = this.dpmReturn;
      this.webpagesservice.web.dpmRefundPolicy = this.dpmRefundPolicy;
      
      
        //start webpagesdetails update service
        this.webpagesservice.webpagesdetailsupdate().subscribe((res: any) => {
            this.response = res;            
            if (this.response != 'Success') {
              this.mes = this.response;
              this.webloading = false;
            } else {
              this.webloading = false;          
               
              this.toastr.success("Web details saved successfully !")
              this.router.navigate([environment.webPages]);
            }
          });
  }

}
