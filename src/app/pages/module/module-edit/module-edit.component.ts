import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from 'src/app/services/module.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.css']
})
export class ModuleEditComponent {

  modulelistUrl = "/" + environment.moduleList

  @Input() Isshowlabeluploadfile = true;
  @Input() Isshowfileupload = true;
  @Input() Isshowselectbox = true; 
  @Input() Isshowlabeleditor = true;
  @Input() Isshoweditor = true;

  
  adminId: any;  
  mdlTitle  : any;      
  mdlDescription  :any;
  mdlActive :any
  Id: any;
  loading = false;
  
    
  mes: any;
  response: any;
  titleMessage: any; 
  message: any;   
  errorCount = 0;

  constructor(       
    public moduleService:ModuleService,
    private router: Router,
    private route: ActivatedRoute
  ) {   
    this.getcat(this.route.snapshot.params['id']);
  }

  // get the record module
  getcat(id: any) {
    this.Id = id;
    this.loading = true
    this.moduleService.getDetail(id).subscribe({
      next: (data: any) => {                                 
        this.mdlTitle = data.mdlTitle                             
        this.mdlDescription = data.mdlDescription       
        this.mdlActive = data.mdlActive        
         this.loading = false
      },
      //error: (e) => console.log(e),
    });
  }
 

   //post for Module Create
   onSubmit(form: NgForm) {
    this.errorCount = 0;

    //Name validation
    if (this.mdlTitle == undefined) {
      this.errorCount++;
      this.titleMessage = 'Please enter title';
    } else {
      if (this.mdlTitle.trim() == '') {
        this.errorCount++;
        this.titleMessage = 'Please enter valid title';
      } else {       
          this.titleMessage = '';       
      }
    } 

   
           

     //Message validation
     if (this.mdlDescription == undefined) {
      this.errorCount++;
      this.message = 'Please enter description';
    } else {
      if (this.mdlDescription.trim() == '') {
        this.errorCount++;
        this.message = 'Please enter valid description';
      } else {       
          this.message = '';       
      }
    } 

    if (this.errorCount == 0) {    
      this.moduleService.mdl.id = this.Id
      this.moduleService.mdl.adminId = localStorage.getItem('userId');        
      this.moduleService.mdl.mdlTitle = this.mdlTitle; 
      this.moduleService.mdl.mdlDescription = this.mdlDescription;                  
      this.moduleService.mdl.mdlActive = this.mdlActive;                  
      
      

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start module create service
        this.moduleService.editModule().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.moduleService.mdl.mdlTitle = '';
            this.router.navigate([environment.moduleList]);
          }
        });
      }
    }
  }


}
