import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CouriercompanyService } from 'src/app/services/couriercompany.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-couriercompany-list',
  templateUrl: './couriercompany-list.component.html',
  styleUrls: ['./couriercompany-list.component.css']
})
export class CouriercompanyListComponent {

  searchString1 :any 
  couriercreateurl="/"+environment.courierCreate  
  courierediturl   = "/" +environment.courierEdit 
  
  courierlist:any
  courierlistloading:any
  
  tableThlist2= ['Company Name', 'Url']
  tableTdlist = ['ccmTitle','ccmUrl']
  //fieldName is show Delete popmenu Name
  fieldName = "ccmTitle";
  //statusName is show Active & DeActive  Name
  statusName = "ccmIsActive"
  scatname:any
  
  no=0;
  isdel = false;  

  constructor(
    public courierService:CouriercompanyService,  
    private router : Router){     
      this.courierList();
  }

  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

  //set edit id
  editCourier(item:any){    
    this.router.navigate([environment.courierEdit+"/"+item.id]);
  }

   //get the list from Courier Company
   private courierList() {
    this.courierlist = null;
    this.courierlistloading = true;
    this.courierService.listCourier().subscribe({
      next: (data: any) => {             
        this.courierlist = data;
        this.courierlistloading = false;
      },
    });
  }

  //delete the Courier Company data 
  deletecty(item: any) {
    this.courierService.deleteCourier(item.id).subscribe({
      next: (res) => {   
        this.courierList();      
        this.isdel = false;
      },      
    });
  }
}
