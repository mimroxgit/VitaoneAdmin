import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent {


  searchString1 :any 
  countrycreateurl="/"+environment.countryCreate  
  countryediturl   = "/" +environment.countryEdit 
  
  countrylist:any
  countrylistloading:any
  
  tableThlist2= ['Country', 'Code']
  tableTdlist = ['ccmName','ccmCode']
  //fieldName is show Delete popmenu Name
  fieldName = "ccmName";
  //statusName is show Active & DeActive  Name
  statusName = "ccmIsActive"
  scatname:any
  
  no=0;
  isdel = false;  

  constructor(
    public countryService:CountryService,  
    private router : Router){     
      this.cntlist();
  }

  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

  //set edit id
  editCountry(item:any){    
    this.router.navigate([environment.countryEdit+"/"+item.id]);
  }

   //get the list from Country
   private cntlist() {
    this.countrylist = null;
    this.countrylistloading = true;
    this.countryService.listCountry().subscribe({
      next: (data: any) => {                  
        this.countrylist = data;
        this.countrylistloading = false;
      },
    });
  }

  //delete the Country data 
  deletecnt(item: any) {
    this.countryService.deleteCountry(item.id).subscribe({
      next: (res) => {   
        this.cntlist();      
        this.isdel = false;
      },      
    });
  }

}
