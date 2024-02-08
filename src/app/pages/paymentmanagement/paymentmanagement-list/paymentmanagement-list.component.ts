import { Component, Input } from '@angular/core';
import { PaymentmanagementService } from 'src/app/services/paymentmanagement.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-paymentmanagement-list',
  templateUrl: './paymentmanagement-list.component.html',
  styleUrls: ['./paymentmanagement-list.component.css']
})
export class PaymentmanagementListComponent {

  payoutdetailsurl ="/" + environment.payoutDetails
  @Input() class="";
  paylist: any;
  paylistloading = true;
  orderByDD:any = [{"Name":"Self"},{"Name":"Patient"}];
  orderBy="All"

  constructor(
   // public orderservice: OrdersService,
    public paymentmanagementService : PaymentmanagementService
  ){
   // this.Patientactive();
    this.transactionlist();
    this.onsearch();
  }

  searchString1 :any 
  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }
   //get the list from transaction
   private transactionlist() {
    this.paylist = null;
    this.paylistloading = true;
    this.paymentmanagementService.listPaymentmanagemen().subscribe({
      next: (data) => {            
        this.paylist = data;           
        this.paylistloading = false;
      },
    });
  }

  /********************* Transaction list Filter************************ */
  //Search
  @Input() Isshowselectbox = true; 
  fromDate="-";
  toDate="-";       
  patientId="All"  
  patientactlist:any;
  patientactlistAll:any;
  patientoptions:any;
  patientoptionsAll:any;
  patientfilteredOptions:any;

  //get the list from  Patient actvie
  // private Patientactive() {   
  //   this.orderservice.PatientsDD().subscribe({
  //     next: (data) => {                                 
  //       this.patientoptions = data;         
  //       this.patientfilteredOptions = data;   
  //       this.patientactlist = data;
  //       this.patientactlistAll = data;              
  //     },
    
  //   });
  // }

  //onchange Patient dropdown serch
  onPat(name:any){    
    this.patientId = name;  
   }

   /*payment  mode dropdown*/
   ordBydd(event:any){   
    if(event.target.value == "-"){
      this.orderBy = "All"
    } else{
      this.orderBy=event.target.value;
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
    if(this.patientId=="All" || this.patientId=="-" || this.patientId == "" || this.patientId==undefined )
    {
      
      this.patientId = 'All'
    }          
    this.transactionlist();
  }
}
