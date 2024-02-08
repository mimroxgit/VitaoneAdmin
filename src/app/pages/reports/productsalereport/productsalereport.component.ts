import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { ReportsService } from 'src/app/services/reports.service';
import * as XLSX from 'xlsx'; 
@Component({
  selector: 'app-productsalereport',
  templateUrl: './productsalereport.component.html',
  styleUrls: ['./productsalereport.component.css']
})
export class ProductsalereportComponent {

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
     this.fromDate= year.toString()+"-"+mnth+"-"+  "01"
     this.toDate= year.toString()+"-"+mnth+"-"+  dth.toString()     
     this.reportName= "Product Sales Report _"+this.fromDate+" to "+this.toDate;     
     this.prdsaleslist();
  }

  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

  ttRenumeration =0
  ttprofit =0
  ttPending=0
  ttProcessing=0
  ttDispatched=0
  ttDelivered=0
  ttReturn=0
  ttCancel=0
  ttFinalSale=0

  //get the list from sales
  private prdsaleslist() {
    this.ttPending = 0;
    this.ttProcessing = 0;
    this.ttDispatched = 0;
    this.ttDelivered = 0;
    this.ttReturn = 0;
    this.ttCancel = 0;
    this.ttFinalSale = 0;
    this.prdsalesreplist = null;
    this.prdsalesreplistloading = true;
   // this.reportsService.listPrdSalesreport(this.fromDate,this.toDate,this.patientId,this.practitionerId,this.status,this.paymentstatus,this.paymodestatus,this.orderBy,this.rpStatus).subscribe({
    this.reportsService.listPrdSalesreport(this.fromDate,this.toDate).subscribe({
      next: (data: any) => {                 
        this.prdsalesreplist = data;        
        var ren = this.prdsalesreplist
        ren.forEach((e:any) => {
          this.ttRenumeration += parseInt( e.renumeration)
          this.ttprofit += e.ormPrice-e.discountAmount-e.additionalDiscountAmount-e.renumeration;
          this.ttPending+= parseInt(e.pending)
          this.ttProcessing+= parseInt(e.processing)          
          this.ttDispatched+= parseInt(e.dispatched)          
          this.ttDelivered+= parseInt(e.delivered)
          this.ttReturn+= parseInt(e.return)
          this.ttCancel+= parseInt(e.cancel)
          this.ttFinalSale+= parseInt(e.finalSale)                  
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
