import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CouponmanagementService } from 'src/app/services/couponmanagement.service';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-couponmanagement-list',
  templateUrl: './couponmanagement-list.component.html',
  styleUrls: ['./couponmanagement-list.component.css']
})
export class CouponmanagementListComponent {

  searchString1 :any;
  couponcreateurl="/"+environment.couponCreate  
    
  Couponlist:any
  couponlistloading:any
  
  tableThlist2= ['Practitioner','Value','Coupon Code','Start Date','End Date','Max Usage','Used']
  tableTdlist = ['practitioner','value','code','startDate','endDate','maxUsage','used']
  //fieldName is show Delete popmenu Name
  fieldName = "code";
  //statusName is show Active & DeActive  Name
  statusName = "status"
  scatname:any
  
  no=0;
  isdel = false;

  //Search
  fromDate="-";
  toDate="-";   
  
  praId="All"
  praoptions:any;
  prafilteredOptions:any;
 
  constructor(
    public PractitionersService:PractitionersService,
    public couponService:CouponmanagementService,   
    private router : Router){  
      this.pralistactive();  
      this.couponlist();

  }

  //onchange practitioner  dropdown serch
  onpra(name:any){    
    this.praId = name;  
   }

  //get the list from  Practitioner  actvie
  private pralistactive() {   
    this.PractitionersService.listActivePractitioners().subscribe({
      next: (data) => {                
        this.praoptions = data; 
        this.prafilteredOptions = data;                 
      },
     // error: (e) => console.log(e),
    });
  }

  //onserch button click
  onsearch(){
    
    if(this.praId=="All" || this.praId=="-" || this.praId == "" || this.praId==undefined )
    {      
      this.praId = 'All'
    }
    if( this.fromDate=="-" || this.fromDate == "" || this.fromDate==undefined )
    {
      this.fromDate = '-'
    }
    if( this.toDate=="-" || this.toDate == "" || this.toDate==undefined )
    {
      this.toDate = '-'
    }
    this.couponlist();
  }
 
  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

  //set edit id
  editcoupon(item:any){    
    this.router.navigate([environment.couponEdit+"/"+item.id]);
  }

  //get the list from Coupon Management
  private couponlist() {
    this.Couponlist = null;
    this.couponlistloading = true;
    this.couponService.listCoupon(this.fromDate,this.toDate,this.praId).subscribe({
      next: (data: any) => {
        this.Couponlist = data;
        this.couponlistloading = false;
      },
    });
  }
 
  //delete the Coupon Management data 
  deletecoupon(item: any) {
    this.couponService.deleteCoupon(item.id).subscribe({
      next: (res) => {                
        this.couponlist();      
        this.isdel = false;
      },      
    });
  }
}
