import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CouponmanagementService } from 'src/app/services/couponmanagement.service';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-couponmanagement-create',
  templateUrl: './couponmanagement-create.component.html',
  styleUrls: ['./couponmanagement-create.component.css']
})
export class CouponmanagementCreateComponent {

  couponlistUrl = "/" + environment.couponList

  practitioneractivelist:any;
  valuelist :any= [{id:'Amount',name:'Amount'},{id:'Percentage',name:"Percentage"}] 
  practitionerId='-';
  adminId: any;
  ccmValue:any;
  ccmStartDate:any;
  ccmEndDate:any;
  ccmCode:any;
  ccmMaxUsage:any;
  ccmMinValue:any;
  ccmOneTime=true;
  ccmIsActive=true;
  
    

  loading = false;
  mes: any;
  response: any;
  pradropdownMessage:any;
  valueMessage:any
  
  startdateMessage:any;
  enddateMessage:any;
  codenameMessage:any;
  maximumnameMessage:any;
  mininameMessage:any;
  errorCount = 0;
  @Input() Isshowselectbox = true; 

  constructor(
    public couponService: CouponmanagementService,
    public practitionerService:PractitionersService,
    private router: Router
  ) {   
    this.practitionerlistactive();
  }

  //practitioner
  onPractitioner(id: any) {
    this.couponService.coupon.practitionerId = id;
    this.practitionerId = this.couponService.coupon.practitionerId;
  }

   //get the list from practitioner actvie
   private practitionerlistactive() {
    this.practitioneractivelist = null;
    this.practitionerService.listActivePractitioners().subscribe({
      next: (data) => {        
        this.practitioneractivelist = data;                      
      },
     // error: (e) => console.log(e),
    });
  }

  //Value onchange DropDown
  onchangevalue(id:any){        
    this.couponService.coupon.ccmType = id;
  }

  //Set default coupon onetime checked Box
  isOnetime($event:any){
    if($event.target.checked==true){      
      this.ccmOneTime=true;            
    }
    else{      
      this.ccmOneTime=false;      
    }
  }
   
  //post for Coupon Management Create
  onSubmit(form: NgForm) {    
    this.errorCount = 0;

    //Practitioner dropdown validation
    if (this.practitionerId == '-') {
      this.errorCount++;
      this.pradropdownMessage = 'Please select practitioner';
    } else {
      this.pradropdownMessage = '';
    }

    //Value  validation
    if (this.ccmValue == undefined) {
      this.errorCount++;
      this.valueMessage = 'Please enter value';
    } else if(this.couponService.coupon.ccmType == undefined) {
      this.valueMessage = 'Please select value type';
    } else{
      this.valueMessage = '';
    }

    //Code validation
    if (this.ccmCode == undefined) {
      this.errorCount++;
      this.codenameMessage = 'Please enter coupon code';
    } else {
      if (this.ccmCode.trim() == '') {
        this.errorCount++;
        this.codenameMessage = 'Please enter valid coupon code';
      } else {       
          this.codenameMessage = '';       
      }
    }   
    //StartDate validation
    if (this.ccmStartDate == undefined) {
      this.errorCount++;
      this.startdateMessage = 'Please enter start date';
    } else {
      if (this.ccmStartDate.trim() == '') {
        this.errorCount++;
        this.startdateMessage = 'Please enter valid name';
      } else {       
          this.startdateMessage = '';       
      }
    }   
    //EndDate validation
    if (this.ccmEndDate == undefined) {
      this.errorCount++;
      this.enddateMessage = 'Please enter end date';
    } else {
      if (this.ccmEndDate.trim() == '') {
        this.errorCount++;
        this.enddateMessage = 'Please enter valid name';
      } else {       
          this.enddateMessage = '';       
      }
    }

    //Maximum Value validation
    if (this.ccmMaxUsage == undefined) {
      this.errorCount++;
      this.maximumnameMessage = 'Please enter maximum usage';
    } else {
      if (this.ccmMaxUsage.trim() == '') {
        this.errorCount++;
        this.maximumnameMessage = 'Please enter valid maximum usage';
      } else {       
          this.maximumnameMessage = '';       
      }
    }
    
    //Minimum Value validation
    if (this.ccmMinValue == undefined) {
      this.errorCount++;
      this.mininameMessage = 'Please enter minimum value';
    } else {
      if (this.ccmMinValue.trim() == '') {
        this.errorCount++;
        this.mininameMessage = 'Please enter valid minimum value';
      } else {       
          this.mininameMessage = '';       
      }
    }
    
    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');
      this.couponService.coupon.adminId = this.adminId;
      this.couponService.coupon.ccmValue = this.ccmValue;
      this.couponService.coupon.ccmStartDate = this.ccmStartDate;
      this.couponService.coupon.ccmEndDate = this.ccmEndDate;      
      this.couponService.coupon.ccmCode = this.ccmCode;      
      this.couponService.coupon.ccmMaxUsage = this.ccmMaxUsage;      
      this.couponService.coupon.ccmMinValue = this.ccmMinValue; 
      this.couponService.coupon.ccmOneTime = this.ccmOneTime;     
      this.couponService.coupon.ccmIsActive = this.ccmIsActive;

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start Coupon Management create service
        this.couponService.createCoupon().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.couponService.coupon.ccmCode = '';           
            this.router.navigate([environment.couponList]);
          }
        });
      }
    }
  }
}
