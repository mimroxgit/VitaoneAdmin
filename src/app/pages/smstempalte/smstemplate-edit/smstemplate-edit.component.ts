import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SmstempalteService } from 'src/app/services/smstempalte.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-smstemplate-edit',
  templateUrl: './smstemplate-edit.component.html',
  styleUrls: ['./smstemplate-edit.component.css']
})
export class SmstemplateEditComponent {

  smsTemplatelistUrl = "/" + environment.smsTemplateList  
  Id: any;
  TitleDD:any = [{"Name":"Coupon Code"},{"Name":"Create Order"},{"Name":"Dispatched Order"},{"Name":"Delivered Order"},{"Name":"Canceled Order"},{"Name":"Login"},{"Name":"With Coupon Code"},{"Name":"Without Coupon Code"},{"Name":"Share Url"},{"Name":"Recommendation With Coupon Code"},{"Name":"Recommendation Without Coupon Code"}];
  TypeDD:any = [{"Name":"SMS"},{"Name":"Whatsapp"}];
  smsTitle:any
  smsType:any
  smsTemplateId:any
  smsMessage=""
  smsIsActive:any;
  loading = false;
  mes: any;
  response: any;
  nameMessage: any;  
  decMessage:any;
  errorCount = 0;
  @Input() Isshowselectbox = true;

  constructor(
    public SmsservicesService: SmstempalteService,
    private router: Router,
    private route: ActivatedRoute) {
      this.getState(this.route.snapshot.params['id']);
  }

   /*dropdown*/
   titleDD(event:any){       
    this.smsTitle=event.target.value;
  }
   /*dropdown*/
   smsTypeDD(event:any){       
    this.smsType=event.target.value;
  }

   // get the record particular State
   getState(id: any) {
    this.Id = id;
    this.loading = true
    this.SmsservicesService.getSmstemplate(id).subscribe({
      next: (data: any) => {
        
        this.smsTitle = data.smsTitle  
        this.smsType = data.smsType 
        this.smsTemplateId = data.smsTemplateId
        this.smsMessage = data.smsMessage
      
        this.smsIsActive = data.smsIsActive
        
         this.loading = false
      },
      //error: (e) => console.log(e),
    });
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

    //Name validation
    if (this.smsTitle == undefined) {
      this.errorCount++;
      this.nameMessage = 'Please enter title';
    } else {
      if (this.smsTitle.trim() == '') {
        this.errorCount++;
        this.nameMessage = 'Please enter valid title';
      } else {       
          this.nameMessage = '';       
      }
    }  
    
     //Name validation
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
      
      this.SmsservicesService.smsModel.id = this.Id;      
      this.SmsservicesService.smsModel.adminId = localStorage.getItem('userId');
      this.SmsservicesService.smsModel.smsTitle = this.smsTitle;   
      this.SmsservicesService.smsModel.smsType = this.smsType;      
      this.SmsservicesService.smsModel.smsMessage = this.smsMessage;      
      this.SmsservicesService.smsModel.smsIsActive = this.smsIsActive;
      if(this.smsTemplateId == undefined){
        this.SmsservicesService.smsModel.smsTemplateId = "-";      
      }else{
        this.SmsservicesService.smsModel.smsTemplateId = this.smsTemplateId;      
      }

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start Template Edit service
        this.SmsservicesService.editSmstemplate().subscribe((res:any) => {
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
