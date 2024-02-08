import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetinquiryService } from 'src/app/services/getinquiry.service';

@Component({
  selector: 'app-getinquiry',
  templateUrl: './getinquiry.component.html',
  styleUrls: ['./getinquiry.component.css']
})
export class GetinquiryComponent {

  
  
  
  Inqlist:any
  Inqlistloading:any
    
  
  no=0;
  isdel = false;  

  constructor(
    public inquiryService:GetinquiryService,  
    private router : Router){     
      this.inquirylist();
  }

  searchString=""
  //onchange type search
  onchaneg(item:any){
    this.searchString = item    
  }

 

   //get the list from inquiry
   private inquirylist() {
    this.Inqlist = null;
    this.Inqlistloading = true;
    this.inquiryService.listInq().subscribe({
      next: (data: any) => {            
        this.Inqlist = data;
        this.Inqlistloading = false;
      },
    });
  }

 

}
