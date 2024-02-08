import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentmanagementService } from 'src/app/services/paymentmanagement.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-payoutdetail',
  templateUrl: './payoutdetail.component.html',
  styleUrls: ['./payoutdetail.component.css']
})
export class PayoutdetailComponent {


  
  dt = new Date();
  paymentlisturl ="/" + environment.paymentmanagementList
  orderdetailsurl ="/" + environment.ordersDetails
  @Input() class="";
  practrnlist: any;
  practrnlistloading = true;
  IsAllselect = true;
  constructor(    
     public paymentmanagementService : PaymentmanagementService,
     private route: ActivatedRoute,
    private router: Router
   ){
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
    this.paymentDate= year.toString()+"-"+mnth+"-"+  dth.toString()
    
    this.transactionlistbypracPaid(this.route.snapshot.params['id']);
    this.transactionlistbyprac(this.route.snapshot.params['id']);
   }

   /************************* transaction listbyprac Paid******************************** */
   searchStringpaid :any 
  //onchange type search
  onchanegpaid(item:any){
    this.searchStringpaid = item    
  }
   
   practrnlistpaid: any;
   practrnlistloadingpaid = true;
   ttamountpaid=0
   //get the list from transaction
   private transactionlistbypracPaid(id: any) {
    this.practionerId = id
    this.practrnlistpaid = null;
    this.practrnlistloading = true;
    this.paymentmanagementService.GetTransactionByPractionerPaid(id).subscribe({
      next: (data) => {                                     
        this.practrnlistpaid = data;
        var list = this.practrnlistpaid
        list.forEach((e:any) => {          
          this.ttamountpaid += parseFloat(e.commisionAmount)           
        });                                                       
        this.practrnlistloading = false;
      },
    });
  }


   searchString1 :any 

  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }
  /************************* transaction listbyprac UnPaid******************************** */

  practionerName = ""
   //get the list from transaction
   private transactionlistbyprac(id: any) {
    this.practionerId = id
    this.practrnlist = null;
    this.practrnlistloading = true;
    this.paymentmanagementService.GetTransactionByPractioner(id).subscribe({
      next: (data:any) => {               
        this.practionerName =data[0].practionerName                        
        this.practrnlist = data;         
        var list = this.practrnlist
        list.forEach((e:any) => {          
          this.ttamount += parseFloat(e.commisionAmount) 
          var OidObject={id:e.orderId}  
          this.ordid.push(OidObject)      
        });                        
        this.practrnlistloading = false;
      },
    });
  }

  ttamount=0
  ordid:any=[]
  allselect($event:any,tr:any){    
    if($event.target.checked==true){ 
      this.ttamount = this.ttamount + parseFloat(tr.commisionAmount)
      var OidObject={id:tr.orderId}
      this.ordid.push(OidObject)
    
    }else{
      this.ttamount = this.ttamount - parseFloat(tr.commisionAmount)
      var oidCheck=this.ordid.filter((a:any)=>{return a.id!=tr.orderId});      
      this.ordid=oidCheck;
    
    }      
  }


  /*********************Pay Now******************************* */
  practionerId:any
  paymentDate:any
  remark:any
  errorCount = 0;
  nameMessage:any;
  loading = false;
  mes: any;
  response: any;
   
  onSubmit() {
    this.errorCount = 0;

    //Name validation
    if (this.paymentDate == undefined) {
      this.errorCount++;
      this.nameMessage = 'Please enter date';
    } else {
      if (this.paymentDate.trim() == '') {
        this.errorCount++;
        this.nameMessage = 'Please enter valid date';
      } else {       
          this.nameMessage = '';       
      }
    }   

    if (this.errorCount == 0) {
      this.paymentmanagementService.pay.practionerId = this.practionerId; 
      this.paymentmanagementService.pay.orderId = this.ordid; 
      this.paymentmanagementService.pay.paymentDate = this.paymentDate; 
      this.paymentmanagementService.pay.commissionAmount = this.ttamount.toString(); 
      this.paymentmanagementService.pay.remark = this.remark;       
      
      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start categories create service
        this.paymentmanagementService.trnPayment().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;           
            this.router.navigate([environment.paymentmanagementList]);
          }
        });
      }
    }
  }

}
