import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentgatewayService } from 'src/app/services/paymentgateway.service';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-paymentgateway-list',
  templateUrl: './paymentgateway-list.component.html',
  styleUrls: ['./paymentgateway-list.component.css']
})
export class PaymentgatewayListComponent {

  searchString1 :any 
  paymentgatewaycreateurl="/"+environment.paymentgatewayCreate  
  paymentgatewayediturl   = "/" +environment.paymentgatewayEdit 
  
  paymentgatewaylist:any
  paymentgatewaylistloading:any
  
  tableThlist2= ['Site Url','Public Key','Private Key']
  tableTdlist = ['pgmUrl','pgmPublicKey','pgmPrivateKey']
  //fieldName is show Delete popmenu Name
  fieldName = "pgmUrl";
  //statusName is show Active & DeActive  Name
  statusName = "pgmIsActive"
  scatname:any
  
  no=0;
  isdel = false;
 
  constructor(
    public paymentgatewayService:PaymentgatewayService,   
    private router : Router){    
      this.pgilist();
  }
 
  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

  //set edit id
  editpgi(item:any){    
    this.router.navigate([environment.paymentgatewayEdit+"/"+item.id]);
  }

  //get the list from Payment Gateway Integration
  private pgilist() {
    this.paymentgatewaylist = null;
    this.paymentgatewaylistloading = true;
    this.paymentgatewayService.listPGI().subscribe({
      next: (data: any) => {                
        this.paymentgatewaylist = data;        
        this.paymentgatewaylistloading = false;
      },
    });
  }
 
  //delete the Payment Gateway Integration data 
  deletepgi(item: any) {
    this.paymentgatewayService.deletePGI(item.id).subscribe({
      next: (res) => {   
        this.pgilist();      
        this.isdel = false;
      },      
    });
  }
}
