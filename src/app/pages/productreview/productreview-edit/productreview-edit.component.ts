import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { ProductreviewService } from 'src/app/services/productreview.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-productreview-edit',
  templateUrl: './productreview-edit.component.html',
  styleUrls: ['./productreview-edit.component.css']
})
export class ProductreviewEditComponent {


  productReviewlistUrl = "/" + environment.productReviewList
 
 
  rattingDD:any = [{"Name":"1"},{"Name":"1.5"},{"Name":"2"},{"Name":"2.5"},{"Name":"3"},{"Name":"3.5"},{"Name":"4"},{"Name":"4.5"},{"Name":"5"}];
  Id: any;
  prmName:any;
  prmDesignation:any;
  prmMessage:any;
  prmRate="1";
  pRMIsRead:any
  pRMIsDisplay:any

  mes: any;
  response: any;
  message: any; 
  nameMessage:any;
  RattingmMessage:any;
  itmdropdownMessage:any;
  errorCount = 0;
  loading = false;


  constructor(
    public productreviewService: ProductreviewService,
    public practitionerService:PractitionersService,
    public itemsService:ItemsService,
    private router: Router,
    private route: ActivatedRoute
  ) {   
    //this.practitionerlistactive()
    this.getcat(this.route.snapshot.params['id']);
  }



   // get the record particular Categories
   getcat(id: any) {
    this.Id = id;
    this.loading = true
    this.productreviewService.getDetail(id).subscribe({
      next: (data: any) => {            
        this.prmName = data.prmName                     
        this.prmDesignation = data.prmDesignation
        this.prmRate = data.prmRate
        this.prmMessage = data.prmMessage
        this.pRMIsRead = data.prmIsRead
        this.pRMIsDisplay = data.prmIsDisplay
         this.loading = false
      },
      //error: (e) => console.log(e),
    });
  }

  /*order status dropdown*/
  RatDD(event:any){       
      this.prmRate=event.target.value;       
    }

    //Is read 
    isBestseller(event:any){
      if(event.target.checked == true){
        this.pRMIsRead = true
      }else{
        this.pRMIsRead =false 
      }    
    }

    //approved
    isapproved(event:any){
      if(event.target.checked == true){
        this.pRMIsDisplay = true
      }else{
        this.pRMIsDisplay =false 
      }    
    }

  //post for Product Review Create
  onSubmit(form: NgForm) {
    this.errorCount = 0;

    //Name validation
    if (this.prmName == undefined) {
      this.errorCount++;
      this.nameMessage = 'Please enter name';
    } else {
      if (this.prmName.trim() == '') {
        this.errorCount++;
        this.nameMessage = 'Please enter valid name';
      } else {       
          this.nameMessage = '';       
      }
    }    
    
     //Item dropdown validation
    //  if (this.itemId == '-' || this.itemId == undefined) {
    //   this.errorCount++;
    //   this.itmdropdownMessage = 'Please select Item';
    // } else {
    //   this.itmdropdownMessage = '';
    // } 

     //Message validation
     if (this.prmMessage == undefined) {
      this.errorCount++;
      this.message = 'Please enter message';
    } else {
      if (this.prmMessage.trim() == '') {
        this.errorCount++;
        this.message = 'Please enter valid message';
      } else {       
          this.message = '';       
      }
    } 

    if (this.errorCount == 0) {            
      this.productreviewService.prdreview.id = this.Id; 
      this.productreviewService.prdreview.prmName = this.prmName; 
      this.productreviewService.prdreview.prmDesignation = this.prmDesignation; 
      this.productreviewService.prdreview.prmMessage = this.prmMessage; 

      this.productreviewService.prdreview.prmRate = this.prmRate; 
      this.productreviewService.prdreview.pRMIsRead = this.pRMIsRead; 
      this.productreviewService.prdreview.pRMIsDisplay = this.pRMIsDisplay; 
      // if(this.practitionerId == undefined){
      //   this.productreviewService.prdreview.practitionerId = "000000000000000000000000"; 
      // }else{
      //   this.productreviewService.prdreview.practitionerId = this.practitionerId;
      // }
      
      
      
      // if(this.prmPhoto == undefined ){
      //   this.productreviewService.prdreview.prmPhoto = "-"
      // } else{
      //   this.productreviewService.prdreview.prmPhoto = this.prmPhoto
      // }    
      

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start categories create service
        this.productreviewService.editProductReview().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.productreviewService.prdreview.prmName = '';
            this.router.navigate([environment.productReviewList]);
          }
        });
      }
    }
  }

}
