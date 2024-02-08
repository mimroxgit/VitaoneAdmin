import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CouriercompanyService } from 'src/app/services/couriercompany.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-couriercompany-create',
  templateUrl: './couriercompany-create.component.html',
  styleUrls: ['./couriercompany-create.component.css']
})
export class CouriercompanyCreateComponent {

  courierlistUrl = "/" + environment.courierList

  adminId: any;  
  ccmTitle:any;
  ccmUrl:any;
  ccmIsActive= true;
  

  loading = false;
  mes: any;
  response: any;
  nameMessage: any; 
  urlMessage:any;
  errorCount = 0;

  constructor(
    public courierService:CouriercompanyService,  
    private router: Router
  ) {   
    
  }
   
  //post for Courier Company Create
  onSubmit(form: NgForm) {
    this.errorCount = 0;

    //Name validation
    if (this.ccmTitle == undefined) {
      this.errorCount++;
      this.nameMessage = 'Please enter name';
    } else {
      if (this.ccmTitle.trim() == '') {
        this.errorCount++;
        this.nameMessage = 'Please enter valid name';
      } else {       
          this.nameMessage = '';       
      }
    }  
    
    //Url validation
    if (this.ccmUrl == undefined) {
      this.errorCount++;
      this.urlMessage = 'Please enter url';
    } else {
      if (this.ccmUrl.trim() == '') {
        this.errorCount++;
        this.urlMessage = 'Please enter valid url';
      } else {       
          this.urlMessage = '';       
      }
    }  

    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');

      this.courierService.ccm.adminId = this.adminId;
      this.courierService.ccm.ccmTitle = this.ccmTitle;
      this.courierService.ccm.ccmUrl = this.ccmUrl;      
      this.courierService.ccm.ccmIsActive = this.ccmIsActive;

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start Courier Company create service
        this.courierService.createCourier().subscribe((res) => {          
          this.response = res;
          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.courierService.ccm.ccmTitle = '';           
            this.router.navigate([environment.courierList]);
          }
        });
      }
    }
  }
}
