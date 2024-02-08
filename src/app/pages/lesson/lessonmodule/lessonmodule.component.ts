import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';
import { ModuleService } from 'src/app/services/module.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-lessonmodule',
  templateUrl: './lessonmodule.component.html',
  styleUrls: ['./lessonmodule.component.css']
})
export class LessonmoduleComponent {

  modulelistUrl = "/" + environment.moduleList

  constructor(
    public lessonService: LessonService, 
    public moduleService:ModuleService,  
    private router : Router,
    private route: ActivatedRoute){ 
      this.moduleId =this.route.snapshot.params['id']
     this.lessonActlist()
      
  }

  searchString = '';
   //onchange type search
  onchaneg(item:any){    
    this.searchString = item    
  }

  lsnlist:any
  sellsnlist:any
  lsnlistloading:any

  //get the Active list from lesson
  private lessonActlist() {
    //this.lsnlist = null;
    this.lsnlistloading = true;
    this.lessonService.Actlistlesson().subscribe({
      next: (data: any) => {                                           
        this.lsnlist = data;  
        this.sellsnlist= data   
        this.lessonAssignedlist()                
        
      },
    });
  }

  Asslsnlist:any
  Asslsnlistloading:any
  //get the Active list from Module
  private lessonAssignedlist() {
    this.Asslsnlist = null;
    this.lsnlistloading = true;
    this.moduleService.Assignedlistlesson(this.moduleId).subscribe({
      next: (data: any) => {                                                
        this.Asslsnlist = data;          
        this.Asslsnlist.forEach((ele:any) => {
          var data = this.lsnlist.filter((t:any)=>t.id==ele.lessonId);
          
          this.clrtick[ele.lessonId]='green-tick'
          var itemData={
            id:ele.lessonId,
            lsmTitle:data!=null ? data[0].lsmTitle :"",
          }
          var d = this.itemList.filter((t:any)=>t.id==ele.id);      
          if(d.length==0)
          {
            this.itemList.push(itemData)
          }
        });
        this.lsnlistloading = false;
      },
    });
  }

  /*******************************onclick Assing Lesson Start************************************************ */
  clrtick:any=[]
  selectedItems:any=[];
  itemList:any=[];

  //select change
   oncat(itm:any,i:any){
    this.clrtick[itm.id]='green-tick'
    
    if(itm!=undefined)
    {
      var d = this.sellsnlist.filter((t:any)=>t.lsmTitle==itm.lsmTitle);      
      if(d.length>=1)
      {
        var s = this.selectedItems.filter((t:any)=>t.lsmTitle==itm.lsmTitle);        
        if(s==0)
        {
          this.selectedItems.push(d[0]);          
        }
      }
    }
    this.selectedItems.forEach((element:any,index:any) => {
      var itemData={
        id:element.id,
        lsmTitle:element.lsmTitle,
      }
      var d = this.itemList.filter((t:any)=>t.id==element.id);      
      if(d.length==0)
      {
        this.itemList.push(itemData)
      }
    });
  }

  //deleteModule
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
    this.lsnlist.forEach((ielement:any,iindex:any) => {
      if(ielement.id==id)
      {
        this.clrtick[ielement.id]="";
      }
    });
  }
 /*******************************onClick Assing lesson End************************************************ */

  loading = false;
  moduleId:any
  
  mes: any;
  response: any;
  titleMessage: any; 
  message: any;   
  errorCount = 0;

  //post for Assing Lesson
  onSubmit(form: NgForm) {
    this.errorCount = 0;
    if (this.errorCount == 0) {
      this.moduleService.mdlsn.adminId = localStorage.getItem('userId');
      this.moduleService.mdlsn.moduleId = this.moduleId;
      this.moduleService.mdlsn.lessonId = this.itemList;
      
      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start Assing lesson create service
        this.moduleService.createlsnAssing().subscribe((res:any) => {
          this.response = res;
          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.router.navigate([environment.moduleList]);
          }
        });
      }
    }
  }
}
