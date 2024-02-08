import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PractitionergroupService } from 'src/app/services/practitionergroup.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-practitionergroup-list',
  templateUrl: './practitionergroup-list.component.html',
  styleUrls: ['./practitionergroup-list.component.css']
})
export class PractitionergroupListComponent {

  Pragroupcreateurl = "/" + environment.practitionergroupCreate

  searchString1 :any     
  pragrouplist:any
  pragrouplistloading:any
  
  tableThlist2= ['Name', 'Default Discount ( % )']
  tableTdlist = ['name','defaultDiscount']
  //fieldName is show Delete popmenu Name
  fieldName = "name";
  //statusName is show Active & DeActive  Name
  statusName = "status"
  //Default Status is show Yes & No  Name
  defaultstatus = "isDefault"
  
  
  isdel = false;  

  constructor(
    public practitionergroupService: PractitionergroupService,
    private router : Router){     
      this.praGrouplist();
  }

  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

  //set edit id
  editPraGroup(item:any){    
    this.router.navigate([environment.practitionergroupEdit+"/"+item.id]);
  }

  //set detail id
  detailPraGroup(item:any){    
    this.router.navigate([environment.practitionergroupDetails+"/"+item.id]);
  }

   //get the list from City
   private praGrouplist() {
    this.pragrouplist = null;
    this.pragrouplistloading = true;
    this.practitionergroupService.listParGroup().subscribe({
      next: (data: any) => {              
        this.pragrouplist = data;
        this.pragrouplistloading = false;
      },
    });
  }

  //delete the City data 
  deleteGroup(item: any) {
    this.practitionergroupService.deletepraGroup(item.id).subscribe({
      next: (res) => {   
        this.praGrouplist();      
        this.isdel = false;
      },      
    });
  }
}
