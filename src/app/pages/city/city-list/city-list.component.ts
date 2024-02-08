import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent {

  searchString1 :any 
  citycreateurl="/"+environment.cityCreate  
  cityediturl   = "/" +environment.cityEdit 
  
  citylist:any
  citylistloading:any
  
  tableThlist2= ['State', 'Name']
  tableTdlist = ['state','ctmTitle']
  //fieldName is show Delete popmenu Name
  fieldName = "ctmTitle";
  //statusName is show Active & DeActive  Name
  statusName = "ctmIsActive"
  scatname:any
  
  no=0;
  isdel = false;  

  constructor(
    public cityService:CityService,  
    private router : Router){     
      this.ctylist();
  }

  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

  //set edit id
  editCity(item:any){    
    this.router.navigate([environment.cityEdit+"/"+item.id]);
  }

   //get the list from City
   private ctylist() {
    this.citylist = null;
    this.citylistloading = true;
    this.cityService.listCity().subscribe({
      next: (data: any) => {          
        this.citylist = data;
        this.citylistloading = false;
      },
    });
  }

  //delete the City data 
  deletecty(item: any) {
    this.cityService.deleteCity(item.id).subscribe({
      next: (res) => {   
        this.ctylist();      
        this.isdel = false;
      },      
    });
  }
}
