import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { ReportsService } from 'src/app/services/reports.service';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.css']
})
export class SalesreportComponent {

  searchString1 :any 
  @Input() class="";
  @Input() Isoutdelivery = "bg-theme";
  @Input() Iscancelled = "bg-danger";
  @Input() Isdelivered = "bg-success";
  @Input() Ispending = "bg-primary";
  @Input() Isconfirm = "bg-info";
  @Input() clsname="bg-theme";
  
  
  salesreplist:any
  salesreplistloading:any  
  
  //Search
  @Input() Isshowselectbox = true; 
  fromDate="-";
  toDate="-";   
  fD="-";
  tD="-";   
  reportName="-";
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
  dt = new Date();
  ttTotalPrice = 0
  ttActualPrice = 0
  totalRecord=10;

  constructor(
    public reportsService:ReportsService,  
    public practitionerService:PractitionersService,
    private router : Router){     
      this.Practitioneractive();
      this.Patientactive();
      
      let date = this.dt.getDate()
      let month = this.dt.getMonth()+1
      let mnth="";
      let dth="";
      if(month<=9){
       mnth = "0"+month.toString();
      }
      else{
        mnth=month.toString();
      }
   
      if(date<=9){
        dth = "0"+date.toString();
      }
      else{
       dth = date.toString();
      }

      let year = this.dt.getFullYear()
     this.fromDate= year.toString()+"-"+mnth+"-"+  "01"
     this.toDate= year.toString()+"-"+mnth+"-"+  dth.toString()     
     this.reportName= "Sales Report _"+this.fromDate+" to "+this.toDate;     
     this.saleslist();
  }



  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

  
  p: number = 1;
  ttprofit =0;
  ttOrders=0;
  ttPending=0;
  ttDispatch=0;
  ttCancelled=0;
  ttDelivered=0;
  //get the list from sales
  private saleslist() {   
    this.p=1;
    this.ttprofit = 0;
    this.ttTotalPrice = 0;
    this.ttActualPrice = 0;
    this.salesreplist = null;
    this.salesreplistloading = true;
    this.ttOrders=0;
    this.ttPending=0;
    this.ttDispatch=0;
    this.ttCancelled=0;
    this.ttDelivered=0;
    this.reportsService.listSalesreport(this.fromDate,this.toDate,this.patientId,this.practitionerId,this.status,this.paymentstatus,this.paymodestatus,this.orderBy,this.rpStatus).subscribe({
      next: (data: any) => {                     
        this.salesreplist = data;        
        var ren = this.salesreplist
        ren.forEach((e:any) => {
          this.ttOrders=data.length;
          var totalPending = this.salesreplist.filter((t:any)=>t.ormStatus=="Pending");
          var totalDisptach = this.salesreplist.filter((t:any)=>t.ormStatus=="Dispatch");
          var totalCancel = this.salesreplist.filter((t:any)=>t.ormStatus=="Cancel");
          var totalDeliver = this.salesreplist.filter((t:any)=>t.ormStatus=="Delivered");
          this.ttPending=totalPending.length;
          this.ttDispatch=totalDisptach.length;
          this.ttCancelled=totalCancel.length;
          this.ttDelivered=totalDeliver.length;
          this.ttprofit += Math.round(e.ormPrice-e.discountAmount-e.additionalDiscountAmount-e.renumeration);
          this.ttTotalPrice += parseInt( e.ormPrice)
          this.ttActualPrice += parseInt( e.ormPrice)-parseInt(e.discountAmount)-parseInt(e.additionalDiscountAmount)
        });
        
        this.salesreplistloading = false;
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
    this.saleslist();
  }


  
  /*name of the excel-file which will be downloaded. */ 
  
  xlsloading=false;
  
  //fileName=this.reportName+'.xlsx';  
  xls(){

      /* table id is passed over here */   
      let element = document.getElementById('excel-table'); 
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.reportName+'.xlsx');
  }
  
  //Display recode 10,50,100,All
  setTotalRecord($event:any){
    this.totalRecord=$event.target.value;
  }

}

