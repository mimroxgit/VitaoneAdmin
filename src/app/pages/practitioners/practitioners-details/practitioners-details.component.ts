import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-practitioners-details',
  templateUrl: './practitioners-details.component.html',
  styleUrls: ['./practitioners-details.component.css']
})
export class PractitionersDetailsComponent {

  orderdetailsurl ="/" + environment.ordersDetails
  practitionerslistUrl = "/" + environment.practitionersList;
  patientsOrdertUrl    = "/" + environment.patientsDetails;

  Practitionerslist:any;
  pcmName:any;
  pcmClinicName:any;
  pcmContactNo:any;
  pcmEmail:any;
  pcmAddress:any;
  loading = true;

  constructor(    
    public practitionersService:PractitionersService,
    private route: ActivatedRoute,
    private router: Router
  ) {   
    this.getPractitioners(this.route.snapshot.params['id']);   
  }

  // get the record particular Practitioners
  getPractitioners(id: any) {  
    
    this.loading = true
    this.practitionersService.getPractitioners(id).subscribe({
      next: (data: any) => {   
        this.Practitionerslist = data 
        
        this.loading = false  
        this.getPracPatients(id)   
        this.getPracCouponlist(id)  
        this.transactionlist(id)
        
      },      
    });
  }

  patloading = false
  PracPatientslist :any
   // get the record particular Practitioner Wise PatientsList
   getPracPatients(id:any) {    
    this.patloading = true
    this.practitionersService.getPracPatients(id).subscribe({
      next: (data: any) => {           
        this.PracPatientslist = data                                          
        this.patloading = false        
      },
      //error: (e) => console.log(e),
    });
  }

  searchString = '';
  //onchange type search
  onchaneg(item:any){
   this.searchString = item    
  }

  patientsOrder(id:any){
    this.router.navigate([this.patientsOrdertUrl+"/"+id])
    localStorage.setItem("seturl","/"+environment.practitionersDetails+"/"+this.route.snapshot.params['id'])
    //routerLink="{{patientsOrdertUrl}}/{{itm.id}}"
  }


  couponloading = false;
  PractitionersCouponlist:any;
  // get the record particular Practitioners wise Coupon Code List
  getPracCouponlist(id: any) {  
    
    this.couponloading = true
    this.practitionersService.getPracCoupon(id).subscribe({
      next: (data: any) => {              
        this.PractitionersCouponlist = data         
        this.couponloading = false            
      },
      //error: (e) => console.log(e),
    });
  }

  searchString1 = '';
  //onchange type search
  onchanegcpn(item:any){
   this.searchString1 = item    
  }

  // get the record particular Practitioners wise Transaction List


  searchStringtrn = '';
  //onchange type search
  onchanegtrn(item:any){
   this.searchStringtrn = item    
  }  
  translist: any;
  translistloading = true;
   
  //get the list from orders
  private transactionlist(id:any) {
    this.translist = null;
    this.translistloading = true;
    this.practitionersService.getPracTransaction(id).subscribe({
      next: (data) => {                 
        this.translist = data;           
        this.translistloading = false;
      },
    });
  }
}
