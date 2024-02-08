import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CouriercompanyService } from 'src/app/services/couriercompany.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-couriercompany-edit',
  templateUrl: './couriercompany-edit.component.html',
  styleUrls: ['./couriercompany-edit.component.css']
})
export class CouriercompanyEditComponent {

  statelistUrl = "/" + environment.stateList

  Id: any;
  adminId: any;    
  ccmTitle:any;
  ccmUrl:any;
  ccmIsActive: any;  
  

  errorCount = 0;
  nameMessage: any;
  urlMessage:any;
  mes: any;
  response: any;
  loading = false;

  constructor(
    public courierService:CouriercompanyService,  
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getCourier(this.route.snapshot.params['id']);
  }

  
  // get the record particular Courier Companies
  getCourier(id: any) {
    this.Id = id;
    this.loading = true
    this.courierService.getCourier(id).subscribe({
      next: (data: any) => {
        (this.ccmTitle = data.ccmTitle),
        (this.ccmUrl = data.ccmUrl),  
        (this.ccmIsActive = data.ccmIsActive)
         this.loading = false
      },
      //error: (e) => console.log(e),
    });
  }

  //post for Courier Companies edit
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
       this.courierService.ccm.id = this.Id;
       this.courierService.ccm.adminId = this.adminId;
       this.courierService.ccm.ccmTitle = this.ccmTitle;      
       this.courierService.ccm.ccmUrl = this.ccmUrl;
       this.courierService.ccm.ccmIsActive = this.ccmIsActive;
                   
      //loading condition start
      if (this.loading == false) {
        this.loading = true;               
        //start Courier Companies edit service
        this.courierService.editCourier().subscribe((res:any) => {                  
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
