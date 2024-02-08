import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductreviewService } from 'src/app/services/productreview.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-productreview-list',
  templateUrl: './productreview-list.component.html',
  styleUrls: ['./productreview-list.component.css']
})
export class ProductreviewListComponent {

  productreviewcreateurl = "/"+environment.productReviewCreate;  


  searchString1 :any 
  countrycreateurl="/"+environment.countryCreate  
  countryediturl   = "/" +environment.countryEdit 
  imgeUrl = environment.cdnUrl + 'Review';  
  
  Reviewlist:any
  Reviewlistloading:any
  
 
  
  no=0;
  isdel = false;  

  constructor(
    public ProductreviewService:ProductreviewService,  
    private router : Router){     
      this.prdReviewlist();
  }

  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

 

   //get the list from Country
   private prdReviewlist() {
    this.Reviewlist = null;
    this.Reviewlistloading = true;
    this.ProductreviewService.listprdreview().subscribe({
      next: (data: any) => {                      
        this.Reviewlist = data;
        this.Reviewlistloading = false;
      },
    });
  }

  Item:any;
  //set modele data (Id and field dispaly name)
  setModalpopup(item:any){    
    this.Item=item;
  }

  //delete the Country data 
  deletecnt(item: any) {
    this.ProductreviewService.deleteprdreview(item.id).subscribe({
      next: (res) => {   
        this.prdReviewlist();      
        this.isdel = false;
      },      
    });
  }

  
  //Edit for product review click
  edit(item:any){
    this.router.navigate([environment.productReviewEdit+"/"+item.id]);
  }

  setRDisplay(item: any) {
    this.ProductreviewService.reviewDisplay(item.id).subscribe({
      next: (res) => {   
        this.prdReviewlist();      
        this.isdel = false;
      },      
    });
  }

}
