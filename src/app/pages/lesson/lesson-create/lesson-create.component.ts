import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.css']
})
export class LessonCreateComponent {

  lessonlistUrl = "/" + environment.lessonList

  @Input() Isshowlabeluploadfile = true;
  @Input() Isshowfileupload = true;
  @Input() Isshowselectbox = true; 
  @Input() Isshowlabeleditor = true;
  @Input() Isshoweditor = true;

  
  adminId: any;  
  lsmTitle  : any;      
  lsmDescription  :any;  
  lsmActive = true
  loading = false;

   
    
  mes: any;
  response: any;
  titleMessage: any; 
  message: any;   
  errorCount = 0;

  constructor(       
    public lessonService:LessonService,
    private router: Router
  ) {   
   
  }

  //select file event itmDocumentation
  selectedDocumentation(documentation: string) {  
    this.fileName =  documentation;   
    //this.itmimag  = documentation.match("data")        
  }

  

  /************************************************* pdf Create start****************************************************** */
  openModalDialog(){
    this.display='block'; //Set block css
  }

  closeModalDialog(){
    this.display='none'; //set none css after close dialog
    this.opacity = "0";
    this.title ="";    
    this.vnameMessage="";
    
    this.index=-1;
  }
  
  index=-1  
  title:any;
  fileName:any;
  isNew="0"

  vnameMessage:any;      
  vpdfMessage:any;      
  itemOthervariant:string[][]=[];  
  itemVariant:any = [];
  display="none";
  opacity = "0";

  //add pdf
  addPdf(){
    this.errorCount = 0;
    
    //Name validation
    if (this.title == undefined) {
      this.errorCount++;
      this.vnameMessage = 'Please enter title';
    } else {
      if (this.title.trim() == '') {
        this.errorCount++;
        this.vnameMessage = 'Please enter valid title';
      } else {
        this.vnameMessage = '';
      }
    }
    
    //pdf validation
    if (this.fileName == undefined) {
      this.errorCount++;
      this.vpdfMessage = 'Please enter pdf';
    } else {     
        this.vpdfMessage = '';     
    }    
    
    var titleExist = this.itemOthervariant.filter((a:any)=>a[0].toLowerCase() == this.title.toLowerCase())
    if(titleExist.length>=1)
    {
      this.itemOthervariant.forEach((element:any,index) => {
        if(this.title == element[0])
        {
          if(this.index!=index)
          {
            this.errorCount++;
            this.vnameMessage = 'title is already exist';
          }
        }
      });
    }
    
    
    if(this.errorCount==0){
      if(this.index==-1){
        this.itemOthervariant.push([this.title,this.fileName,this.isNew])
        var itmv={
          title:this.title,
          fileName:this.fileName.replace("||",""),
          isNew:this.isNew
        }
        
        this.itemVariant.push(itmv)
      }else{
        this.itemOthervariant[this.index][0]=this.title;
        this.itemOthervariant[this.index][1]=this.fileName.replace("||","");
        this.itemOthervariant[this.index][2]=this.isNew
        this.index=-1;
      }
      this.closeModalDialog();
      this.title ="";
    }
  }
  
  //Delete pdf
  deletePdf(deldec:any){
    this.itemOthervariant.splice(deldec,1)
  }
  
  /************************************************* Pdf Create End****************************************************** */
  /************************************************* Video Start****************************************************** */
  //Video 
  display1="none";
  opacity1 = "0";
  openDialog(){
    this.display1='block'; //Set block css
  }

  closeDialog(){
    this.display1='none'; //set none css after close dialog
    this.opacity1 = "0";
    this.vdotitle ="";    
    this.titlehtmlMessage="";
    this.url="";
    this.urlhtmlMessage="";
    this.indexs=-1;
  }

  itemOtherDesc:string[][]=[];  
  titlehtmlMessage:any
  urlhtmlMessage:any
  vdotitle:any;
  url:any;
  indexs=-1
  
  itemDec:any = [];

  addhtml(){

    this.errorCount = 0;

     //Name validation
     if (this.vdotitle == undefined) {
      this.errorCount++;
      this.titlehtmlMessage = 'Please enter title';
    } else {
      if (this.vdotitle.trim() == '') {
        this.errorCount++;
        this.titlehtmlMessage = 'Please enter valid title';
      } else {
        this.titlehtmlMessage = '';
      }
    }

    //url validation
    if (this.url == undefined) {
      this.errorCount++;
      this.urlhtmlMessage = 'Please enter url';
    } else {
      if (this.url.trim() == '') {
        this.errorCount++;
        this.urlhtmlMessage = 'Please enter valid url';
      } else {
        this.urlhtmlMessage = '';
      }
    }
    if(this.errorCount==0){
    var vTitle = this.vdotitle;
    var vUrl = this.url;
    if(this.indexs==-1){
      this.itemOtherDesc.push([vTitle,vUrl]); 
      var itm={       
        title:vTitle,
        url :vUrl
      }      
      this.itemDec.push(itm)
    }
    else{
      this.itemOtherDesc[this.indexs][0]=vTitle;
      this.itemOtherDesc[this.indexs][1]=vUrl;
      this.indexs=-1;
    }    
    this.closeDialog();
    this.vdotitle ="";
    this.url =""; 
  }
}

   //Edit item decription 
  edithtml(dec:any){   
    this.openDialog(); 
    this.indexs = dec
    this.vdotitle=this.itemOtherDesc[dec][0]
    this.url=this.itemOtherDesc[dec][1]
  }

  //Delete item decription 
  deletehtml(deldec:any){
    this.itemOtherDesc.splice(deldec,1)
  }
/*************************************************  video End****************************************************** */
   
   //post for Lesson Create
   onSubmit(form: NgForm) {
    this.errorCount = 0;

    //Name validation
    if (this.lsmTitle == undefined) {
      this.errorCount++;
      this.titleMessage = 'Please enter title';
    } else {
      if (this.lsmTitle.trim() == '') {
        this.errorCount++;
        this.titleMessage = 'Please enter valid title';
      } else {       
          this.titleMessage = '';       
      }
    } 
              

     //Message validation
     if (this.lsmDescription == undefined) {
      this.errorCount++;
      this.message = 'Please enter description';
    } else {
      if (this.lsmDescription.trim() == '') {
        this.errorCount++;
        this.message = 'Please enter valid description';
      } else {       
          this.message = '';       
      }
    } 

    if (this.errorCount == 0) {    
      this.lessonService.lsm.adminId = localStorage.getItem('userId');        
      this.lessonService.lsm.lsmTitle = this.lsmTitle; 
      this.lessonService.lsm.lsmDescription = this.lsmDescription; 
      this.lessonService.lsm.lsmActive = this.lsmActive; 
      this.lessonService.lsm.lsmPdf =this.itemVariant    
      this.lessonService.lsm.lsmVideo =this.itemDec                 
                  
      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start lesson create service
        this.lessonService.createLesson().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.lessonService.lsm.lsmTitle = '';
            this.router.navigate([environment.lessonList]);
          }
        });
      }
    }
  }

}
