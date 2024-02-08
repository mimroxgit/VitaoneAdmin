import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as e from 'express';

import { CategoriesService } from 'src/app/services/categories.service';
import { DosesService } from 'src/app/services/doses.service';
import { ItemsService } from 'src/app/services/items.service';
import { ItemunitsService } from 'src/app/services/itemunits.service';
import { PractitionercategoriesService } from 'src/app/services/practitionercategories.service';
import { SubcategoriesService } from 'src/app/services/subcategories.service';
import { environment } from 'src/environments/environments';
import { ItemsDetailsComponent } from '../items-details/items-details.component';
import { duration } from 'moment';



@Component({
  selector: 'app-items-create',
  templateUrl: './items-create.component.html',
  styleUrls: ['./items-create.component.css'],
  
})
export class ItemsCreateComponent implements OnInit {

  imgs=false
  itemslistUrl = "/" + environment.itemsList

  dsmactlist:any;
  itemDose="";
  catactlist:any;
  itmCategory="";
  Iunitlist:any;
  durtlist=[{'Name':'Day'},{'Name':'Month'},{'Name':'Year'}];
  name:any;    
  subcatactlist:any;
  subcatactlistAll:any;
  subCategories:any;
  practitionercatlist:any;
  pratitionerCategories:any;

  adminId:any;
  itmName:any;  
  itmSeoTitle:any;
  itmSeoDesc:any;
  itmSeoKeywords:any;
  itmHsnCode:any;
  itmSacCode:any;  
  itmIsGst:any;
  itmIGst:any;
  itmCGst:any;
  itmSGst:any;
  itmShortDesc:any;
  itmLongDesc:any;  
  itmImageGallery:any;
  itmVideo:any;
  itmDocumentation:any;
  itmSampleReport:any;
  itmimageUrl: any;
  itmIsActive=true;
  itmIsBestSeller=false;
  itmFeatures:any;
  loading = false;
  dsmloading = true;
  catloading = true;
  subcatloading = true;
  alloading = true;
  mes: any;
  response: any;
  nameMessage: any; 
  unitMessage:any;  
  costpriceMessage:any;
  mrpMessage:any;
  igstMessage:any;
  cgstMessage:any;
  sgstMessage:any;
  itmSeoTitleMessage:any;
  itmSeoDescMessage:any;
  itmSeoKeywordsMessage:any;
  dsmdropdownMessage:any;
  catdropdownMessage:any;
  subcatdropdownMessage:any;
  pracatdropdownMessage:any;
  shortdesMessage:any;
  longDescMessage:any;
  suggestedUseMessage:any;
  factsMessage:any;
  instructionMessage:any;
  itemImageMessage:any;
  itemdocMessage:any;
  
  errorCount = 0;
  @Input() isoffer = false;
  @Input() Isshoweditor = true;
  @Input() Isshowlabeleditor = true;
  @Input() Isshowfileupload = true;
  @Input() Isshowlabeluploadfile = true;

  itemOtherDesc:string[][]=[];  
  itemDescTitle:any;
  itemDescDetail:any;
  dsmId ="";
  catId ="";
  subId ="";
  parcatId="";

  constructor(    
    public unitService:ItemunitsService,
    public dosesrvice:DosesService,
    public categoryservice:CategoriesService,
    public subcategoryservice:SubcategoriesService,
    public pracategoriesService: PractitionercategoriesService,
    public itemService:ItemsService,
    private router: Router,   
  ){   
    this.itemService.item.itmImageGallery="";
  }

  ngOnInit(): void {
    this.unitlist();   
  }
  
  isBestseller(event:any){
    if(event.target.checked == true){
      this.itmIsBestSeller = true
    }else{
      this.itmIsBestSeller =false 
    }    
  }

  //select file event itmImageGallery
  selectedfile(pimImages: string) {          
    this.itemService.item.itmImageGallery = this.itemService.item.itmImageGallery + pimImages;     
    const itemimg = pimImages.split("||");
    
    this.itmimageUrl = itemimg[0];
  }
  
  //select file event itmDocumentation
  selectedDocumentation(documentation: string) {  
    this.itemService.item.itmDocumentation =  documentation;   
    //this.itmimag  = documentation.match("data")        
  }

  //select file event for ItmSampleReport
  selectedReport(sampleReport: string) {    
    this.itemService.item.itmSampleReport =  sampleReport;
    const itemimg = sampleReport.split("||");
   // this.itmimageUrl = itemimg[0];
  } 

  //is Offer checkbox hide & show
  checkbox() {
    if (this.isoffer == true) {
      this.isoffer = false;
      this.itmIsGst = this.isoffer;
    } else {
      this.isoffer = true;
      this.itmIsGst = this.isoffer;
    }
  }   

  //Doses onchange DropDown
  onchangedsm(id: any) {
    this.dsmId += id+"||";  
    this.itemDose =this.dsmId;
    //this.itemService.item.itemDose = this.dsmId;
    //this.itemDose = this.itemService.item.itemDose    
   
  }

  //category onchange DropDown
  onchangecat(id: any) {
    this.catId += id+"||";
    this.itemService.item.itmCategory = this.catId;
    this.itmCategory = this.itemService.item.itmCategory    
    // let catList:any=[]; 
    // if(id=="-"){
    //   this.subcatactlist=this.subcatactlistAll;
    //  }else{
    //   catList=this.subcatactlistAll.filter((a:any)=>a.categoryId==id)           
    //   this.subcatactlist=catList;
    //  }  
    //  this.itmCategory = id
    //  this.subId = ""
  }

  //sub category onchange DropDown
  onchangesubcat(id: any) {
    this.subId += id+"||";
    this.itemService.item.subCategories = this.subId;
    this.subCategories = this.itemService.item.subCategories
  }

  //practioner category onchange DropDown
  onchangeparcat(id: any) {
    this.parcatId += id+"||";
    this.itemService.item.pratitionerCategories = this.parcatId;
    this.pratitionerCategories = this.itemService.item.pratitionerCategories    
    
  }

  //get the list from Item unit
  private unitlist() {
    this.Iunitlist = null;
    this.unitService.listActItemunits().subscribe({
      next: (data) => {
        this.Iunitlist = data;   
        this.doseList();
        this.catList();
        this.subcatList();
        this.pracatList();       
      },
    });
  }

   //get the list from Doses actvie
   private doseList() {
    this.dsmloading = true
    this.dsmactlist = null;
    this.dosesrvice.listActiveDoses().subscribe({
      next: (data) => {
        this.dsmactlist = data;        
        this.dsmloading = false
      },
    });
  }

  //get the list from category actvie
  private catList() {
    this.catloading = true
    this.catactlist = null;
    this.categoryservice.listActcategories().subscribe({
      next: (data) => {
        this.catactlist = data;        
        this.catloading = false
      },
    });
  }

  //get the list from sub category actvie
  private subcatList() {
    this.subcatloading = true
    this.subcatactlist = null;
    this.subcategoryservice.listActScategories().subscribe({
      next: (data) => {
        this.subcatactlist = data;
        this.subcatactlistAll = data;
        this.subcatloading = false;
      },
    });
  }

  //get the list from practioner category actvie
  private pracatList() {
    this.alloading = true
    this.practitionercatlist = null;
    this.pracategoriesService.listActpracategories().subscribe({
      next: (data) => {
        this.practitionercatlist = data;
        this.alloading = false
      },
    });
  }


   //post for Items Create
   onSubmit(form: NgForm) {
    this.errorCount = 0;
    
    
    //Name validation
    if (this.itmName == undefined) {
      this.errorCount++;
      this.nameMessage = 'Please enter name';
    } else {
      if (this.itmName.trim() == '') {
        this.errorCount++;
        this.nameMessage = 'Please enter valid name';
      } else {       
          this.nameMessage = '';       
      }
    }      
    
    if(this.itmSeoTitle==undefined || this.itmSeoTitle=="")
    {
      this.itmSeoTitle=this.itmName
    }
    if(this.itmSeoDesc==undefined || this.itmSeoDesc=="")
    {
      this.itmSeoDesc=this.itmName
    }
    if(this.itmSeoKeywords==undefined || this.itmSeoKeywords=="")
    {
      this.itmSeoKeywords=this.itmName
    }
     //Meta Title validation    
     if(this.itmSeoTitle.length > 60){
      this.errorCount++;
      this.itmSeoTitleMessage = 'Only 60 character is valid!';
    }else{
      this.itmSeoTitleMessage = '';
    }
    
    //Meta Descripion validation    
    if(this.itmSeoDesc.length > 160){

      this.errorCount++;
      this.itmSeoDescMessage = 'Only 160 character is valid!';
    }else{
      this.itmSeoDescMessage = '';
    }
    //Meta Keyword validation    
    if(this.itmSeoKeywords.length > 30){

      this.errorCount++;
      this.itmSeoKeywordsMessage = 'Only 30 character is valid!';
    }else{
      this.itmSeoKeywordsMessage = '';
    }

    //Gst validation
    if (this.isoffer == true) {
      
      //IGst validation
      if (this.itmIGst == undefined) {
        this.errorCount++;
        this.igstMessage = 'Please enter igst';
      }
      else {
        if (this.itmIGst.trim() == '') {
          this.errorCount++;
          this.igstMessage = 'Please enter valid igst';
        }
        else {
          this.igstMessage = '';
        }
      }
      
      //CGST  validation
      if (this.itmCGst == undefined) {
        this.errorCount++;
        this.cgstMessage = 'Please enter cgst';
      }
      else {
        if (this.itmCGst.trim() == '') {
          this.errorCount++;
          this.cgstMessage = 'Please enter valid cgst';
        }
        else {
          this.cgstMessage = '';
        }
      }
      
      //SGST validation
      if (this.itmSGst == undefined) {
        this.errorCount++;
        this.sgstMessage = 'Please enter sgst';
      }
      else {
        if (this.itmSGst.trim() == '') {
          this.errorCount++;
          this.sgstMessage = 'Please enter valid sgst';
        }
        else {
          this.sgstMessage = '';
        }
      }
    }
    //Doses dropdown validation     
    // if (this.itemDose == undefined ||this.itemDose == "") {
    //   this.errorCount++;
    //   this.dsmdropdownMessage = 'Please select dose';
    // } else {
    //   this.dsmdropdownMessage = '';
    // }

     //Category dropdown validation     
     if (this.itmCategory == undefined ||this.itmCategory == "") {
      this.errorCount++;
      this.catdropdownMessage = 'Please select category';
    } else {
      this.catdropdownMessage = '';
    }

    //Sub Category dropdown validation
    if (this.subCategories == undefined ||this.subCategories == "") {
      this.errorCount++;
      this.subcatdropdownMessage = 'Please select sub category';
    } else {
      this.subcatdropdownMessage = '';
    }

    //practioner Category dropdown validation
    if (this.pratitionerCategories == undefined ||this.pratitionerCategories == "") {
      this.errorCount++;
      this.pracatdropdownMessage = 'Please select practitioner  category';
    } else {
      this.pracatdropdownMessage = '';
    }

    //Image validation
    if (this.itmimageUrl == undefined) {
      this.errorCount++;
      this.itemImageMessage = 'Please select image';
    } else {
      this.itemImageMessage = '';
    }
      
    //Long Description validation
    if (this.itmLongDesc == undefined) {
      
      this.errorCount++;
      this.longDescMessage = 'Please enter long description';
    } else {
      if (this.itmLongDesc.trim() == '') {
        this.errorCount++;
        this.longDescMessage = 'Please enter valid long description';
      } else {
        this.longDescMessage = '';
      }
    }
 
     //Short Descripion validation   
      // if(this.itmShortDesc!=undefined){
      //   if(this.itmShortDesc.length > 250){
      //     this.errorCount++;
      //     this.shortdesMessage = 'Only 250 character is valid!';
      //   }else{
      //     this.shortdesMessage = '';
      //   }
      // }

      //Name validation
      // if(this.itmtype == 'Elearning'){
      //   if (this.itmDuration == undefined) {
      //     this.errorCount++;
      //     this.itmDurationMessage = 'Please enter duration';
      //   } else {
      //     if (this.itmDuration.trim() == '') {
      //       this.errorCount++;
      //       this.itmDurationMessage = 'Please enter valid duration';
      //     } else {       
      //         this.itmDurationMessage = '';       
      //     }
      //   }  
      // }
    
    
    
    if (this.errorCount == 0) {

      if(this.itmHsnCode == undefined){
        this.itemService.item.itmHsnCode = "-";
      }else{
        this.itemService.item.itmHsnCode = this.itmHsnCode;
      }

      if(this.itmSacCode == undefined){
        this.itemService.item.itmSacCode = "-"
      } else{
        this.itemService.item.itmSacCode = this.itmSacCode;
      }

      if (this.itmIsGst == undefined) {
        this.itmIsGst = false;
      } 
      if(this.itmIsGst== false){
        this.itemService.item.itmIGst = 0.00
        this.itemService.item.itmCGst = 0.00
        this.itemService.item.itmSGst = 0.00
      }
      else{
        this.itemService.item.itmIGst = this.itmIGst;
        this.itemService.item.itmCGst = this.itmCGst;
        this.itemService.item.itmSGst = this.itmSGst;
      }
      if(this.itmFeatures == undefined){
        this.itemService.item.itmFeatures = "-"
      }else{
        this.itemService.item.itmFeatures = this.itmFeatures
      }      
      
      if(this.itmShortDesc == undefined){
        this.itemService.item.itmShortDesc = "-"
      }else{
        this.itemService.item.itmShortDesc = this.itmShortDesc
      }

      if(this.itmDocumentation == undefined){
        this.itemService.item.itmDocumentation = "-"
      }
      if(this.itmSampleReport == undefined){
        this.itemService.item.itmSampleReport = "-"
      }
      if(this.itmVideo == undefined){
        this.itemService.item.itmVideo = "-"
      }
      else{
        this.itemService.item.itmVideo = this.itmVideo
      }
      
      this.adminId = localStorage.getItem('userId');
      this.itemService.item.adminId = this.adminId;
      this.itemService.item.itmName = this.itmName;
      if(this.itmSeoTitle == undefined){
        this.itemService.item.itmSeoTitle = this.itmName;
      }else{
        this.itemService.item.itmSeoTitle = this.itmSeoTitle;
      }

      if(this.itmSeoDesc == undefined){
        this.itemService.item.itmSeoDesc = this.itmName;
      }else{
        this.itemService.item.itmSeoDesc = this.itmSeoDesc;
      }

      if(this.itmSeoKeywords == undefined){
        this.itemService.item.itmSeoKeywords = this.itmName;
      }else{
        this.itemService.item.itmSeoKeywords = this.itmSeoKeywords;
      }
      //this.itemService.item.itmQty = parseInt(this.itmQty);      
      //this.itemService.item.itmCostPrice = parseInt(this.itmCostPrice);
      //this.itemService.item.itmMRP = parseInt(this.itmMRP);
      this.itemService.item.itmIsBestSeller = this.itmIsBestSeller;
      this.itemService.item.itmIsGst = this.itmIsGst;
     
      if(this.itemDose == undefined || this.itemDose == null){
        this.itemService.item.itemDose = "-" ;   
      }else{
        this.itemService.item.itemDose = this.itemDose;   
      }
      
      this.itemService.item.itmCategory = this.itmCategory;      
      this.itemService.item.itmLongDesc = this.itmLongDesc;      
      this.itemService.item.itmIsActive = this.itmIsActive;  
      this.itemService.item.itemVariants =this.itemVariant ;   
      this.itemService.item.itemDescriptions =this.itemDec;
      this.itemService.item.itmType =this.itmtype;
      if(this.itmDuration == undefined){
        this.itemService.item.itmDuration = "-";
      }else{
        this.itemService.item.itmDuration =this.itmDuration;
      }
      
      
      
      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start Items create service
        this.itemService.createItems().subscribe((res:any) => {
          this.response = res;
          if (this.response.response != 'Success') {
            this.mes = this.response.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.itemService.item.itmName = '';    
            if(this.itmtype=="Supplement")       
            {
              this.router.navigate([environment.itemsList]);
            }
            else{
              this.router.navigate([environment.courseDetails,this.response.id])
            }
          }
        });
      }
    }
  }

/************************************************* item price variant Create start****************************************************** */
  index=-1
  unitName="Unit";
  itmvName:any;
  itmVQty:any;
  itmVunitId:any;  
  itmVCostPrice:any;
  itmVMRP:any;
  itmOfferPrice:any;
  itmisDefault=true;
  itmIsOffer=false;
  itmVDuration:any;
  itmVDurationType="Duration";
  vnameMessage:any;
  vcostpriceMessage:any;
  vmrpMessage:any;
  vOfferMessage:any;
  durationMessage:any;
  itemOthervariant:string[][]=[];  
  itemVariant:any = [];
  display="none";
  opacity = "0";

  //Unit onchange DropDown
  onchangeVunit(id:any,name:any){
    this.unitName=name;
    this.itmVunitId = id;
  }

  //Duration onchange DropDown
  onchangeDur(name:any){
    this.itmVDurationType=name;    
  }
    
  openModalDialog(){
    this.display='block'; //Set block css
  }
  
  closeModalDialog(){
    this.display='none'; //set none css after close dialog
    this.opacity = "0";
    this.itmvName ="";
    this.itmVCostPrice = "";
    this.itmVMRP = "";
    this.itmVQty = "";
    this.itmVunitId = "";
    this.unitName = "Unit"
    this.vnameMessage="";
    this.durationMessage="";
    this.itmVDuration="";
    this.itmVDurationType="Duration";
    this.itmisDefault = true
    this.index=-1;
  }

  //Set default checked Box
  isDefault($event:any){
    if($event.target.checked==true){      
      this.itmisDefault=true;            
    }
    else{      
      this.itmisDefault=false;      
    }
  }

  //Set Is Offer checked Box
  isOffer($event:any){
    if($event.target.checked==true){      
      this.itmIsOffer=true;            
    }
    else{      
      this.itmIsOffer=false;      
    }
  }

  //item price
  addVariant(){
    
    this.errorCount = 0;
    if(this.itmisDefault==undefined){
      this.itmisDefault=true;
    }
    //Name validation
    if (this.itmvName == undefined) {
     this.errorCount++;
     this.vnameMessage = 'Please enter name';
   } else {
     if (this.itmvName.trim() == '') {
       this.errorCount++;
       this.vnameMessage = 'Please enter valid name';
     } else {       
         this.vnameMessage = '';       
     }
   }   


    //Duration  validation
   if(this.itmtype=="Elearning"){
    if (this.itmVDuration == undefined || this.itmVDuration == "") {
      this.errorCount++;
      this.durationMessage = 'Please enter duration';
    } else {
       if(this.itmVDurationType == "Duration" || this.itmVDurationType == undefined || this.itmVDurationType == "") {
         this.errorCount++;
         this.durationMessage = 'Please select duration type';
       } else{
         this.durationMessage = '';
       }
     }
   }

     //Quantity  validation
     if (this.itmVQty == undefined || this.itmVQty == "") {
      this.errorCount++;
      this.unitMessage = 'Please enter quantity';
    } else {
       if(this.itmVunitId == "Unit" || this.itmVunitId == undefined || this.itmVunitId == "") {
         this.errorCount++;
         this.unitMessage = 'Please select quantity unit';
       } else{
         this.unitMessage = '';
       }
     }

    //Cost Price validation
    if (this.itmVCostPrice == undefined) {
     this.errorCount++;
     this.vcostpriceMessage = 'Please enter cost price';
   } else {
     if (this.itmVCostPrice.trim() == '') {
       this.errorCount++;
       this.vcostpriceMessage = 'Please enter valid cost price';
     } else {
         this.vcostpriceMessage = '';       
     }
   }   

   //MRP Price validation
   if (this.itmVMRP == undefined) {
     this.errorCount++;
     this.vmrpMessage = 'Please enter mrp';
   } else {
     if (this.itmVMRP.trim() == '') {
       this.errorCount++;
       this.vmrpMessage = 'Please enter valid mrp';
     } else {
         this.vmrpMessage = '';       
     }
   }  

   //Offer Price validation
   if(this.itmIsOffer==true)
   {
    if (this.itmOfferPrice == undefined) {
      this.errorCount++;
      this.vOfferMessage = 'Please enter offer price';
    } else {
      if (this.itmOfferPrice.trim() == '') {
        this.errorCount++;
        this.vOfferMessage = 'Please enter valid offer price';
      } else {
          this.vOfferMessage = '';       
      }
    }  
   }
  
   
   var titleExist = this.itemOthervariant.filter((a:any)=>a[0].toLowerCase() == this.itmvName.toLowerCase())
   if(titleExist.length>=1)
   {
    this.itemOthervariant.forEach((element:any,index) => {
      if(this.itmvName == element[0])
      {
        if(this.index!=index)
        {
          this.errorCount++;
          this.vnameMessage = 'Variant name is already exist';
        }
      }
    });
   }
   else{
     this.vnameMessage = '';
   }
   
  
   if(this.errorCount==0){

    if(this.index==-1){
      if(this.itmisDefault==true)
      {
        this.itemOthervariant.forEach((element:any,index) => {
          this.itemOthervariant[index][5]="false";
        });
      }
      if(this.itmIsOffer == false){
        this.itmOfferPrice = this.itmVMRP
      }
      
      this.itemOthervariant.push([this.itmvName,this.itmVQty,this.itmVunitId,this.itmVCostPrice,this.itmVMRP,this.itmisDefault,this.unitName,this.itmIsOffer,this.itmOfferPrice,this.itmVDuration,this.itmVDurationType])
      var itmv={
        name:this.itmvName,
        itmCostPrice:this.itmVCostPrice,
        itmMRP:this.itmVMRP,
        itmQty:this.itmVQty,
        unitId:this.itmVunitId,
        isDefault:this.itmisDefault,
        unitName:this.unitName,
        itmIsOffer:this.itmIsOffer,
        itmOfferPrice:this.itmOfferPrice,
        itmVDuration:this.itmVDuration,
        itmVDurationType:this.itmVDurationType,
      }
      this.itemVariant.push(itmv)
    }else{
      if(this.itmisDefault==true)
      {
        this.itemOthervariant.forEach((element:any,index) => {
          this.itemOthervariant[index][5]="false";
        });
      }
      this.itemOthervariant[this.index][0]=this.itmvName;
      this.itemOthervariant[this.index][1]=this.itmVQty;
      this.itemOthervariant[this.index][2]=this.itmVunitId;
      this.itemOthervariant[this.index][3]=this.itmVCostPrice;
      this.itemOthervariant[this.index][4]=this.itmVMRP;
      this.itemOthervariant[this.index][5]=this.itmisDefault.toString();
      this.itemOthervariant[this.index][6]=this.unitName;
      this.itemOthervariant[this.index][7]=this.itmIsOffer.toString();      
      
      if(this.itmIsOffer == false){
        this.itemOthervariant[this.index][8] = this.itmVMRP;        
      }
      else{
        this.itemOthervariant[this.index][8] = this.itmOfferPrice;        
      }
      this.itemOthervariant[this.index][9]=this.itmVDuration;
      this.itemOthervariant[this.index][10]=this.itmVDurationType;  
      
      this.index=-1;
    }
    
    this.closeModalDialog();
    this.itmvName ="";
    this.itmVCostPrice = "";
    this.itmVMRP = "";
    this.itmVQty = "";
    this.itmVunitId = "";
    this.unitName = "";
    this.itmOfferPrice = "";
    this.itmVDuration="";
    this.itmVDurationType="";
  }
}

   //Edit item decription 
   editVariant(pv:any){   
    
    var unitData = this.Iunitlist.find((t:any)=>t.id==this.itemOthervariant[pv][2]);
    if(unitData.length!=0){
      this.unitName=unitData.name;
    }
    this.openModalDialog();
    this.index = pv
    this.itmvName=this.itemOthervariant[pv][0]
    this.itmVQty=this.itemOthervariant[pv][1]
    this.itmVunitId=this.itemOthervariant[pv][2]
    this.itmVCostPrice=this.itemOthervariant[pv][3]
    this.itmVMRP=this.itemOthervariant[pv][4]        
   // this.itmisDefault=Boolean( this.itemOthervariant[pv][5])
   this.unitName=this.itemOthervariant[pv][6]     
   this.itmOfferPrice=this.itemOthervariant[pv][8]       
   this.itmVDuration=this.itemOthervariant[pv][9]       
   this.itmVDurationType=this.itemOthervariant[pv][10]       
   
   if(this.itemOthervariant[pv][7].toString()== 'false'){      
    this.itmIsOffer = false
  }else{      
    this.itmIsOffer = true
  }
  
    if(this.itemOthervariant[pv][5]== 'false'){      
      this.itmisDefault = false
    }else{      
      this.itmisDefault = true
    }
    //alert(Boolean(this.itemOthervariant[pv][5]))
   // alert(this.itmisDefault)
  }

   //Delete item decription 
   deleteVariant(deldec:any){
    this.itemOthervariant.splice(deldec,1)
  }

/************************************************* item price variant Create End****************************************************** */


/************************************************* item decription Start****************************************************** */
  //item decription 
  indexs=-1
  itemDec:any = [];

  addhtml(){
    var dTitle = this.itemDescTitle;
    var dDetail = this.itemDescDetail;
    if(this.indexs==-1){
      this.itemOtherDesc.push([dTitle,dDetail]); 
      var itm={       
        title:dTitle,
        description :dDetail
      }      
      this.itemDec.push(itm)
    }
    else{
      this.itemOtherDesc[this.indexs][0]=dTitle;
      this.itemOtherDesc[this.indexs][1]=dDetail;
      this.indexs=-1;
    }    
    this.itemDescTitle ="";
    this.itemDescDetail ="";   
  }

   //Edit item decription 
  edithtml(dec:any){    
    this.indexs = dec
    this.itemDescTitle=this.itemOtherDesc[dec][0]
    this.itemDescDetail=this.itemOtherDesc[dec][1]
  }

  //Delete item decription 
  deletehtml(deldec:any){
    this.itemOtherDesc.splice(deldec,1)
  }
/************************************************* item decription End****************************************************** */
/************************************************* radio button Start****************************************************** */  
  itmDurationMessage:any
  itmDuration:any;
  itmtype='Supplement'
  type=false
  
  selectedbtn(event:any){        
    if(event.target.value=='Supplement'){      
      this.type = false
      this.itmtype =event.target.value
    }else{
      this.type = true
      this.itmtype =event.target.value
    }
  
  }

/************************************************* radio button End****************************************************** */
}
