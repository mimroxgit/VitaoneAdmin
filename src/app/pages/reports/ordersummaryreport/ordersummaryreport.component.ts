import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { ReportsService } from 'src/app/services/reports.service';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-ordersummaryreport',
  templateUrl: './ordersummaryreport.component.html',
  styleUrls: ['./ordersummaryreport.component.css']
})
export class OrdersummaryreportComponent {

  searchString1 :any 
  @Input() class="";
  
  prdsalesreplist:any
  prdsalesreplistloading:any  
  
  //Search
  @Input() Isshowselectbox = true; 
  fromDate="-";
  toDate="-";   
  fD="-";
  tD="-";   
  reportName="-";      

  regType="All"  
  @ViewChild('type') type !: ElementRef;
  dt = new Date();
  constructor(
    public reportsService:ReportsService,  
    public practitionerService:PractitionersService,
    private router : Router){     
      
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
     this.fromDate= year.toString()+"-"+mnth+"-"+  dth.toString()  
     this.toDate= year.toString()+"-"+mnth+"-"+  dth.toString()     
     this.reportName= "Order Summary Report _"+this.fromDate+" to "+this.toDate;     
     this.prdsaleslist();
  }

  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

  
  totalOrder=0;
  totalCodAmount=0;
  totalOnlineAmount=0;
  totalAmount=0;
  //get the list from sales
  private prdsaleslist() {
    this.totalOrder=0;
    this.totalCodAmount=0;
    this.totalOnlineAmount=0;
    this.totalAmount=0;
    this.prdsalesreplist = null;
    this.prdsalesreplistloading = true;
   // this.reportsService.listPrdSalesreport(this.fromDate,this.toDate,this.patientId,this.practitionerId,this.status,this.paymentstatus,this.paymodestatus,this.orderBy,this.rpStatus).subscribe({
    this.reportsService.listOrderSummary(this.fromDate,this.toDate).subscribe({
      next: (data: any) => {           
        this.prdsalesreplist = data;        
        var ren = this.prdsalesreplist
        this.prdsalesreplist.forEach((ele:any) => {
        this.totalOrder=this.totalOrder+ele.totalOrder;
        this.totalCodAmount=this.totalCodAmount+ele.codAmount;
        this.totalOnlineAmount=this.totalOnlineAmount+ele.onlineAmount;
        this.totalAmount=this.totalCodAmount+this.totalOnlineAmount;
       });
        this.prdsalesreplistloading = false;
      },
    });
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
    this.prdsaleslist();
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
  

}
