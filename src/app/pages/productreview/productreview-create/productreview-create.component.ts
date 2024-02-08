import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { ProductreviewService } from 'src/app/services/productreview.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-productreview-create',
  templateUrl: './productreview-create.component.html',
  styleUrls: ['./productreview-create.component.css']
})
export class ProductreviewCreateComponent {

  productReviewlistUrl = "/" + environment.productReviewList
  
  @Input() Isshowlabeluploadfile = true;
  @Input() Isshowfileupload = true;
  @Input() Isshowselectbox = true; 

  rattingDD:any = [{"Name":"1"},{"Name":"1.5"},{"Name":"2"},{"Name":"2.5"},{"Name":"3"},{"Name":"3.5"},{"Name":"4"},{"Name":"4.5"},{"Name":"5"}];
  practitionerId:any;
  practitioneractivelist:any;
  itemId:any;
  Itemactivelist:any;
  prmName:any;
  prmPhoto:any;
  prmDesignation:any;
  prmMessage:any;
  RattingmMessage:any
  prmRate="1";
  prmPhotoUrl: any;
  

  loading = false;
  itmdropdownMessage:any
  pradropdownMessage:any;
  mes: any;
  response: any;
  nameMessage: any; 
  message: any; 
  errorCount = 0;
  
  constructor(
    public productreviewService: ProductreviewService,
    public practitionerService:PractitionersService,
    public itemsService:ItemsService,
    private router: Router
  ) {   
    //this.practitionerlistactive()
    this.Itemlistactive()
  }

  /*order status dropdown*/
  RatDD(event:any){       
    this.prmRate=event.target.value;       
  }

  //practitioner
  onPractitioner(id: any) {
    this.productreviewService.prdreview.practitionerId = id;
    this.practitionerId = this.productreviewService.prdreview.practitionerId;
  }

   //get the list from practitioner actvie
   private practitionerlistactive() {
    this.practitioneractivelist = null;
    this.practitionerService.listActivePractitioners().subscribe({
      next: (data) => {        
        this.practitioneractivelist = data;                      
      },
     // error: (e) => console.log(e),
    });
  }

  //practitioner
  onItems(id: any) {
    this.productreviewService.prdreview.itemId = id;
    this.itemId = this.productreviewService.prdreview.itemId;
  }

   //get the list from practitioner actvie
   private Itemlistactive() {
    this.Itemactivelist = null;
    this.itemsService.listActitm1().subscribe({
      next: (data) => {                      
        this.Itemactivelist = data;                      
      },
     // error: (e) => console.log(e),
    });
  }

  //select file event itmImageGallery
  selectedfile(pimImages: string) {    
    const itemimg = pimImages.split("||");
    this.prmPhoto = pimImages    
    this.prmPhotoUrl = itemimg[0];
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


    //ratting validation
    // if (this.prmRate == undefined) {
    //   this.errorCount++;
    //   this.RattingmMessage = 'Please enter ratting';
    // } else {
    //   if (this.prmRate.trim() == '') {
    //     this.errorCount++;
    //     this.RattingmMessage = 'Please enter valid ratting';
    //   } else {       
    //       this.RattingmMessage = '';       
    //   }
    // }  
    
     //Item dropdown validation
     if (this.itemId == '-' || this.itemId == undefined) {
      this.errorCount++;
      this.itmdropdownMessage = 'Please select Item';
    } else {
      this.itmdropdownMessage = '';
    } 

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
      this.productreviewService.prdreview.prmName = this.prmName; 
      this.productreviewService.prdreview.prmDesignation = this.prmDesignation; 
      this.productreviewService.prdreview.prmMessage = this.prmMessage; 

      this.productreviewService.prdreview.prmRate = this.prmRate; 
      if(this.practitionerId == undefined){
        this.productreviewService.prdreview.practitionerId = "000000000000000000000000"; 
      }else{
        this.productreviewService.prdreview.practitionerId = this.practitionerId;
      }
      
      // if(this.itemId == undefined){
      //   this.productreviewService.prdreview.itemId = "000000000000000000000000"; 
      // }else{
      //   this.productreviewService.prdreview.itemId = this.itemId; 
      // }
      
      if(this.prmPhoto == undefined ){
        this.productreviewService.prdreview.prmPhoto = "-"
      } else{
        this.productreviewService.prdreview.prmPhoto = this.prmPhoto
      }    
      

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start categories create service
        this.productreviewService.createprdreview().subscribe((res:any) => {
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
