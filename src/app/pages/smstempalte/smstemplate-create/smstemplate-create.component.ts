import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SmstempalteService } from 'src/app/services/smstempalte.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-smstemplate-create',
  templateUrl: './smstemplate-create.component.html',
  styleUrls: ['./smstemplate-create.component.css']
})
export class SmstemplateCreateComponent {

  smsTemplatelistUrl = "/" + environment.smsTemplateList
  TitleDD:any = [{"Name":"Coupon Code"},{"Name":"Create Order"},{"Name":"Dispatched Order"},{"Name":"Delivered Order"},{"Name":"Canceled Order"},{"Name":"Login"},{"Name":"With Coupon Code"},{"Name":"Without Coupon Code"},{"Name":"Share Url"},{"Name":"Recommendation With Coupon Code"},{"Name":"Recommendation Without Coupon Code"}];
  TypeDD:any = [{"Name":"SMS"},{"Name":"Whatsapp"}];
  
  smsTitle:any
  smsType:any
  smsMessage=""
  smsIsActive=true
  smsTemplateId:any
  loading = false;
  mes: any;
  response: any;
  nameMessage: any;  
  decMessage:any;
  errorCount = 0;
  @Input() Isshowselectbox = true;
  
  constructor(
    public SmsservicesService: SmstempalteService,
    private router: Router) {
    
  }

  /*dropdown*/
  titleDD(event:any){       
      this.smsTitle=event.target.value;
    }

    /*dropdown*/
  smsTypeDD(event:any){       
    this.smsType=event.target.value;
  }

  //click customer
  ClinicName(){    
    this.smsMessage= this.smsMessage.concat("$$ClinicName$$")    
    }
  
  //click shop
  Discount(){
    this.smsMessage= this.smsMessage.concat(" $$Discount$$")
  }
  
  //click complex name
  CouponCode(){
    this.smsMessage= this.smsMessage.concat(" $$CouponCode$$")
  }
  
  // click amount  
  Storeurl(){
    this.smsMessage= this.smsMessage.concat(" $$StoreUrl$$")
  }

  PatientName(){
    this.smsMessage= this.smsMessage.concat(" $$PatientName$$")
  }
  OrderNo(){
    this.smsMessage= this.smsMessage.concat(" $$OrderNo$$")
  }
  DispatchBy(){
    this.smsMessage= this.smsMessage.concat(" $$DispatchBy$$")
  }
  LrNo(){
    this.smsMessage= this.smsMessage.concat(" $$LrNo$$")
  }
  OTP(){
    this.smsMessage= this.smsMessage.concat(" $$OTP$$")
  }


  
    

  //Type create    
  onSubmit(form: NgForm) {
    this.errorCount = 0;            


     //Message validation
     if (this.smsMessage == undefined) {
      this.errorCount++;
      this.decMessage = 'Please enter message';
    } else {
      if (this.smsMessage.trim() == '') {
        this.errorCount++;
        this.decMessage = 'Please enter valid message';
      } else {       
          this.decMessage = '';       
      }
    }  

    if (this.errorCount == 0) {
      

      this.SmsservicesService.smsModel.adminId = localStorage.getItem('userId');
      if(this.smsTitle == undefined){
        this.SmsservicesService.smsModel.smsTitle = "Coupon Code";      
      }else{
        this.SmsservicesService.smsModel.smsTitle = this.smsTitle;      
      }
      if(this.smsType == undefined){
        this.SmsservicesService.smsModel.smsType = "SMS";      
      }else{
        this.SmsservicesService.smsModel.smsType = this.smsType;      
      }
      if(this.smsTemplateId == undefined){
        this.SmsservicesService.smsModel.smsTemplateId = "-";      
      }else{
        this.SmsservicesService.smsModel.smsTemplateId = this.smsTemplateId;      
      }
      
      
      this.SmsservicesService.smsModel.smsMessage = this.smsMessage;      
      this.SmsservicesService.smsModel.smsIsActive = this.smsIsActive;

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start State create service
        this.SmsservicesService.createSmstemplate().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.SmsservicesService.smsModel.smsTitle = '';           
            this.router.navigate([environment.smsTemplateList]);
          }
        });
      }
    }
  }
}
