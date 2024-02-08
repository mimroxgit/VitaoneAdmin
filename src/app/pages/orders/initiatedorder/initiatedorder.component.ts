import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-initiatedorder',
  templateUrl: './initiatedorder.component.html',
  styleUrls: ['./initiatedorder.component.css']
})
export class InitiatedorderComponent {

  orderdetailsurl ="/" + environment.ordersDetails
  orderlist: any;
  ordlistloading = true;
  @Input() class="";
  @Input() Isoutdelivery = "bg-theme";
  @Input() Iscancelled = "bg-danger";
  @Input() Isdelivered = "bg-success";
  @Input() Ispending = "bg-primary";
  @Input() Isconfirm = "bg-info";
  @Input() clsname="bg-theme";
  p: number = 1;


  //Search
  @Input() Isshowselectbox = true; 
  fromDate="-";
  toDate="-";   
  orderStatusDD:any = [{"Name":"Pending"},{"Name":"Processing"},{"Name":"Dispatch"},{"Name":"Delivered"},{"Name":"Rejected"},{"Name":"Cancel"}];
  paymentModeDD:any = [{"Name":"COD"},{"Name":"Online"}];
  paymentStatusDD:any = [{"Name":"Pending"},{"Name":"Received"},{"Name":"Refund"},{"Name":"Cancel"}];
  rpStatusDD:any = [{"Name":"created"},{"Name":"authorized"},{"Name":"captured"},{"Name":"refunded"},{"Name":"failed"}];
  orderByDD:any = [{"Name":"Patient"},{"Name":"Practioner"}];
  status="All"
  paymodestatus="All"
  rpStatus="All"
  paymentstatus="All"
  orderBy="All"
  patientId="All"
  
  patientactlist:any;
  patientactlistAll:any;
  patientoptions:any;
  patientoptionsAll:any;
  patientfilteredOptions:any;

  
  practitionerId="All"
  pracatoptions:any;
  pracatfilteredOptions:any;
  regType="All"  
  @ViewChild('type') type !: ElementRef;

  constructor(
    public orderservice: OrderService,
    public practitionerService:PractitionersService
  ){
    this.Practitioneractive();
    this.Patientactive();
    this.ordlist();
  }

  searchString = '';
  //onchange type search
  onchaneg(item:any){
   this.searchString = item    
  }

  

  //get the list from orders
  private ordlist() {
    this.p=1;
    //this.orderlist = null;
    this.ordlistloading = true;
    this.orderservice.listInitiatedOrders(this.fromDate,this.toDate,this.patientId,this.practitionerId,this.status,this.paymentstatus,this.paymodestatus,this.orderBy,this.rpStatus).subscribe({
      next: (data) => {                          
        this.orderlist = data;                  
        this.ordlistloading = false;
      },
    });
  }


   //onchange Practitioner dropdown serch
   onPrac(name:any){      
    let PracList:any=[]; 
    if(name=="-"){
      this.patientoptions=this.patientactlistAll;
      this.patientfilteredOptions=this.patientactlistAll;
     }else{
      PracList=this.patientactlistAll.filter((a:any)=>a.practitionerId==name)                 
      this.patientoptions=PracList;
      this.patientfilteredOptions=PracList;      
     } 
    this.practitionerId = name;  
   }

  //get the list from  Practitioner Category actvie
  private Practitioneractive() {   
    this.practitionerService.PractitionerDD().subscribe({
      next: (data) => {                   
        this.pracatoptions = data; 
        this.pracatfilteredOptions = data;                 
      },
     // error: (e) => console.log(e),
    });
  }

  //onchange Patient dropdown serch
  onPat(name:any){    
    this.patientId = name;  
   }

  //get the list from  Patient actvie
  private Patientactive() {   
    this.practitionerService.PatientDD().subscribe({
      next: (data) => {                                 
        this.patientoptions = data;         
        this.patientfilteredOptions = data;   
        this.patientactlist = data;
        this.patientactlistAll = data;              
      },
     // error: (e) => console.log(e),
    });
  }

     /*order status dropdown*/
     ordstatusDD(event:any){   
      if(event.target.value == "-"){
        this.status = "All"
      } else{
        this.status=event.target.value;
      }   
     
      }

     /*payment  mode dropdown*/
     paymodeDD(event:any){   
      if(event.target.value == "-"){
        this.paymodestatus = "All"
      } else{
        this.paymodestatus=event.target.value;
      }   
     
      }

      /*payment  mode dropdown*/
     rpStatusDD1(event:any){   
      if(event.target.value == "-"){
        this.rpStatus = "All"
      } else{
        this.rpStatus=event.target.value;
      }   
     
      }

       /*payment  mode dropdown*/
     ordBydd(event:any){   
      if(event.target.value == "-"){
        this.orderBy = "All"
      } else{
        this.orderBy=event.target.value;
      }   
     
      }

      /*payment  mode dropdown*/
     paymentDD(event:any){   
      if(event.target.value == "-"){
        this.paymentstatus = "All"
      } else{
        this.paymentstatus=event.target.value;
      }   
     
      }

      //onserch button click
  onsearch(){
    if( this.fromDate=="-" || this.fromDate == "" || this.fromDate==undefined )
    {
      this.fromDate = '-'
    }
    if( this.toDate=="-" || this.toDate == "" || this.toDate==undefined )
    {
      this.toDate = '-'
    }
    if(this.status=="All" || this.status=="-" || this.status == "" || this.status==undefined )
    {      
      this.status = 'All'
    }
    if(this.patientId=="All" || this.patientId=="-" || this.patientId == "" || this.patientId==undefined )
    {
      
      this.patientId = 'All'
    }
    if(this.practitionerId=="All" || this.practitionerId=="-" || this.practitionerId == "" || this.practitionerId==undefined )
    {
      
      this.practitionerId = 'All'
    }
    if(this.paymentstatus=="All" || this.paymentstatus=="-" || this.paymentstatus == "" || this.paymentstatus==undefined )
    {      
      this.paymentstatus = 'All'
    }
    if(this.paymodestatus=="All" || this.paymodestatus=="-" || this.paymodestatus == "" || this.paymodestatus==undefined )
    {      
      this.paymodestatus = 'All'
    }
    if(this.orderBy=="All" || this.orderBy=="-" || this.orderBy == "" || this.orderBy==undefined )
    {      
      this.orderBy = 'All'
    }
    if(this.rpStatus=="All" || this.rpStatus=="-" || this.rpStatus == "" || this.rpStatus==undefined )
    {      
      this.rpStatus = 'All'
    }
    this.ordlist();
  }

  /************************************Payment Gateway Orders list******************************************* */

  pgmData:any=[];
  pgmloading= false
  rzrPaymentId="-";

  //get the list from  Payment Gateway Orders
  paymentGatewayOrders(id:any,no:any) {
    this.pgmloading = true
    this.pgmData = []; 
    this.ormNo = no
    this.ormInitiateRemark=null
    this.orderservice.getlistPaymentGatewayOrders(id).subscribe({
      next: (data) => {         

        this.pgmData = data;         
        
        var d = this.pgmData.filter((t:any)=>t.captured=="True" && t.status=="captured");
        if(d.length>=1)
        {
          this.rzrPaymentId=d[0].id;
        }
        this.pgmloading = false
      },     
    });
  }

  ormInitiateRemark:any
  ormNo:any
  initiatedloading = false
  errorCount = 0;
  response: any;

  onOrd(){

    this.errorCount = 0;   
    if (this.errorCount == 0) {
      this.orderservice.ordInitiate.ormNo = this.ormNo;
      if(this.ormInitiateRemark == undefined){
        this.orderservice.ordInitiate.ormInitiateRemark = "-" 
      }else{
        this.orderservice.ordInitiate.ormInitiateRemark = this.ormInitiateRemark; 
      }
      
      this.orderservice.ordInitiate.rzrPaymentId = this.rzrPaymentId;             

      //loading condition start
      if (this.initiatedloading == false) {
        this.initiatedloading = true;
        
        //start initiate order update service
        this.orderservice.updateInitiateOrder().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {           
            this.initiatedloading = false;
            this.ordlist()
          } else {
            this.initiatedloading = false;
            this.ordlist()
            //this.router.navigate([environment.categoriesList]);
          }
        });
      }
    }
  }

}
