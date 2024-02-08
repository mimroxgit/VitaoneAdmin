import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleService } from 'src/app/services/module.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent {

  searchString1 :any 
  modulecreateurl="/"+environment.moduleCreate
  lessonmoduleurl = "/"+ environment.lessonmodule

  modulelist:any
  modulelistloading:any
  isdel = false;  

  constructor(
    public moduleService: ModuleService,   
    private router : Router){ 
      this.Modulelist()         
  }

  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

   //get the list from Module
   private Modulelist() {
    this.modulelist = null;
    this.modulelistloading = true;
    this.moduleService.listmodule().subscribe({
      next: (data: any) => {                            
        this.modulelist = data;        
        this.modulelistloading = false;
      },
    });
  }

  Item:any;
  //set modele data (Id and field dispaly name)
  setModalpopup(item:any){    
    this.Item=item;
  }

  //delete the Module data 
  deletecnt(item: any) {
    this.moduleService.deleteModule(item.id).subscribe({
      next: (res) => {   
        this.Modulelist();      
        this.isdel = false;
      },      
    });
  }

  
  //Edit for Module click
  edit(item:any){
    this.router.navigate([environment.moduleEdit+"/"+item.id]);
  }

  //Edit for Module click
  AssingLesson(item:any){
    this.router.navigate([environment.lessonmodule+"/"+item.id]);
  }

}
