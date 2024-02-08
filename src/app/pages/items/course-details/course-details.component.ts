import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { ModuleService } from 'src/app/services/module.service';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {

  courselistUrl = "/" + environment.courseList;  
  urlSafe:SafeResourceUrl | undefined;
  
  Id:any;
  itemDescriptions:any;
  itemdetail:any;
  itmImage:any;
  name:any;
  loading = false;
  imgeUrl = environment.cdnUrl + 'Product/';
  docUrl = environment.docUrl
  imageGallary:any=[];
  courseModuleList:any
  searchString = '';

  constructor(
    public sanitizer:DomSanitizer,
    public itemsService: ItemsService,
    public moduleService:ModuleService,
    public practitionersService:PractitionersService,  
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.participantList();
    this.getitem(this.route.snapshot.params['id']);
    this.moduleActlist()
    this.participantlist(this.route.snapshot.params['id'])
    
  }

   // get the record particular item details
   getitem(id: any) {
    this.Id = id
    this.loading = true
    this.itemsService.getDetail(id).subscribe({
      next: (data: any) => {                        
        this.name = data.itmName
        if(data.itmVideo != null ||data.itmVideo != '-' || data.itmVideo != ''){
          this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(data.itmVideo)
        }
        this.itemdetail =data        
        this.courseModuleList = data.courseModuleList
        this.itemDescriptions=data.itemDescriptions
        this.itmImage = data.itmImageGallery.split(",")
        this.imageGallary=[];
       

        if(data.itmImageGallery!= null){
          let  imageGallary = data.itmImageGallery.split(',');
          imageGallary.forEach((item:any) => {            
            let i:any ={
              image: this.imgeUrl+item,
              thumbImage:this.imgeUrl+item
            }
            if(item!=""){
              this.imageGallary.push(i);
            }
          });
        }
        
        this.loading = false
      },
      //error: (e) => console.log(e),
    });
  }

  clrtick:any=[];
  clrtick1:any=[];
  mdllist:any;
  prcList:any;
  prcList1:any;
  sellsnlist:any;
  selectedItems:any=[];
  selectedItems1:any=[];
  itemList:any=[];
  itemList1:any=[];
  
//type search
onchaneg(item:any){    
  this.searchString = item    
}

  //get the Active list from Module
  private moduleActlist() {
    //this.lsnlist = null;
    //this.lsnlistloading = true;
    this.moduleService.Actlistmodule().subscribe({
      next: (data: any) => {                                           
        this.mdllist = data;   
        this.sellsnlist= data                               
      },
    });
  }

   //get the Active practitioner from Module
   private participantList() {
    //this.lsnlist = null;
    //this.lsnlistloading = true;
    this.practitionersService.PractitionerDD().subscribe({
      next: (data: any) => {  

        this.prcList = data;   
        this.prcList1= data;                              
        
      },
    });
  }

   //select Course Module 
   oncat(itm:any){    
    this.clrtick[itm.id]='green-tick'

    if(itm!=undefined)
    {
      var d = this.sellsnlist.filter((t:any)=>t.mdlTitle==itm.mdlTitle);      
      if(d.length>=1)
      {
        var s = this.selectedItems.filter((t:any)=>t.mdlTitle==itm.mdlTitle);        
        if(s==0)
        {
          this.selectedItems.push(d[0]);           
        }
      }
    }
    
    this.selectedItems.forEach((element:any,index:any) => {
      var itemData={
        id:element.id,
        mdlTitle:element.mdlTitle,
      }
      var d = this.itemList.filter((t:any)=>t.id==element.id);   
         
      if(d.length==0)
      {
        this.itemList.push(itemData)
      }
    });
    
  }

  //delete Course Module
  deleteItem(id:any){
    let sIndex=-1;
    this.itemList.forEach((element:any,index:any) => {
      if(id==element.id)
      {
        this.itemList.splice(index,1)
      }
    });
    this.selectedItems.forEach((selement:any,sindex:any) => {
      if(id==selement.id)
      {
        this.selectedItems.splice(sindex,1)
      }
    });
    this.mdllist.forEach((ielement:any,iindex:any) => {
      if(ielement.id==id)
      {
        this.clrtick[ielement.id]="";
      }
    });
  }


   //select Course Participant 
   oncat1(itm:any){    
    this.clrtick1[itm.id]='green-tick'

    if(itm!=undefined)
    {
      var d = this.prcList1.filter((t:any)=>t.id==itm.id);      
      if(d.length>=1)
      {
        var s = this.selectedItems1.filter((t:any)=>t.id==itm.id);        
        if(s==0)
        {
          this.selectedItems1.push(d[0]);           
        }
      }
    }
    
    this.selectedItems1.forEach((element:any,index:any) => {
      var itemData={
        courseId:this.route.snapshot.params['id'],
        id:element.id,
      }
      var d = this.itemList1.filter((t:any)=>t.id==element.id);   
         
      if(d.length==0)
      {
        this.itemList1.push(itemData)
      }
    });
    
  }

  //delete Course Participant
  deleteItem1(id:any){
    let sIndex=-1;
    this.itemList1.forEach((element:any,index:any) => {
      if(id==element.id)
      {
        this.itemList1.splice(index,1)
      }
    });
    this.selectedItems1.forEach((selement:any,sindex:any) => {
      if(id==selement.id)
      {
        this.selectedItems1.splice(sindex,1)
      }
    });
    this.prcList.forEach((ielement:any,iindex:any) => {
      if(ielement.id==id)
      {
        this.clrtick1[ielement.id]="";
      }
    });
  }


  catTitle: any;
  catActive = true
  catimageUrl: any;
  adminId: any;  

  itmmdlloading = false;
  mes: any;
  response: any;
  nameMessage: any; 
  catImageMessage:any;
  errorCount = 0;
  catImage :any

  onSubmit(){
    this.errorCount = 0;

    //Name validation
    // if (this.catTitle == undefined) {
    //   this.errorCount++;
    //   this.nameMessage = 'Please enter name';
    // } else {
    //   if (this.catTitle.trim() == '') {
    //     this.errorCount++;
    //     this.nameMessage = 'Please enter valid name';
    //   } else {       
    //       this.nameMessage = '';       
    //   }
    // }      
    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');

      this.itemsService.itemdl.adminId = this.adminId;
      this.itemsService.itemdl.id = this.Id;           
      this.itemsService.itemdl.courseModule = this.itemList;

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start Item Module create service
        this.itemsService.createItemsModule().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;            
            this.getitem(this.route.snapshot.params['id']);
          }
          this.itemList=[];
          this.clrtick=[];
        });
      }
    }

  }


  onSubmit1(){
    this.errorCount = 0;

     
    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');

      this.itemsService.courseParticipant = this.itemList1;            

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start Item Module create service
        this.itemsService.addParticipant().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;            
            this.getitem(this.route.snapshot.params['id']);
            this.participantlist(this.route.snapshot.params['id'])
          }
          this.itemList1=[];
          this.clrtick1=[];
        });
      }
    }

  }

  Item:any;
  //set modele data (Id and field dispaly name)
  setModalpopup(item:any){  
    this.Item=item;
  }

  participantInfo:any
  setModalpopup1(item:any){      
    this.participantInfo=item;
    this.Modaldisplayname=item.name;
  }

  //delete the Item mOduel data 
  deleteImodule(item: any) {
    this.itemsService.deleteItemsModule(item.id,this.Id).subscribe({
      next: (res) => {   
        this.getitem(this.route.snapshot.params['id']);
      },      
    });
  }

  
  parlist:any;
   //get the Active Participant
   private participantlist(id:any) {       
    this.itemsService.listGetParticipant(id).subscribe({
      next: (data: any) => {                                                   
        this.parlist = data; 
        this.parlist.forEach((e:any) => {
          this.clrtick1[e.patientId]="green-tick";
        }); 
      },
    });
  }
  Modaldisplayname:any;
  crsRegDate:any;
  crsExpDate:any;
  csmId:any;
  camName:any;
  camPlan:any;
  editParticipant(itm:any)
  {
    
    this.camName=itm.name;
    this.camPlan=itm.subscriptionPlan;
    this.csmId=itm.id;
    let regDate=itm.regDate.split("-");
    this.crsRegDate=regDate[2]+"-"+regDate[1]+"-"+regDate[0];
    let expDate=itm.expDate.split("-");
    this.crsExpDate=expDate[2]+"-"+expDate[1]+"-"+expDate[0];
  }

  submitEditParticipant(){
   this.itemsService.EditCourseParticipant.id=this.csmId;
   this.itemsService.EditCourseParticipant.camStartDate=this.crsRegDate;
   this.itemsService.EditCourseParticipant.camExpiryDate=this.crsExpDate;
   this.itemsService.UpdateParticipant().subscribe((res:any) => {
    this.response = res;

    if (this.response != 'Success') {
      this.mes = this.response;
      this.loading = false;
    } else {
      this.loading = false;            
      this.getitem(this.route.snapshot.params['id']);
      this.participantlist(this.route.snapshot.params['id'])
    }
  });
  }

  
  
  deleteParticipant(itm:any){
    this.itemsService.courseParticipant.courseId="-";
    this.itemsService.courseParticipant.id=itm.id;

    this.itemsService.DeleteParticipant().subscribe((res:any) => {
      this.response = res;

      if (this.response != 'Success') {
        this.mes = this.response;
        this.loading = false;
      } else {
        this.loading = false;            
        this.getitem(this.route.snapshot.params['id']);
        this.participantlist(this.route.snapshot.params['id'])
      }
    });
  }

}
