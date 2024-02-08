import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PractitionercategoriesService } from 'src/app/services/practitionercategories.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-practitionercat-create',
  templateUrl: './practitionercat-create.component.html',
  styleUrls: ['./practitionercat-create.component.css']
})
export class PractitionercatCreateComponent {

  pracategorieslistUrl = "/" + environment.practitionercategoriesList

  adminId: any;  
  pCatTitle: any;
  pCatActive = true
  

  loading = false;
  mes: any;
  response: any;
  nameMessage: any; 
  errorCount = 0;

  constructor(
    public pracategoriesService: PractitionercategoriesService,
    private router: Router
  ) {   
    
  }
   
  //post for Practitioner Categories Create
  onSubmit(form: NgForm) {
    this.errorCount = 0;

    //Name validation
    if (this.pCatTitle == undefined) {
      this.errorCount++;
      this.nameMessage = 'Please enter name';
    } else {
      if (this.pCatTitle.trim() == '') {
        this.errorCount++;
        this.nameMessage = 'Please enter valid name';
      } else {       
          this.nameMessage = '';       
      }
    }   

    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');

      this.pracategoriesService.pracat.adminId = this.adminId;
      this.pracategoriesService.pracat.pCatTitle = this.pCatTitle;      
      this.pracategoriesService.pracat.pCatActive = this.pCatActive;

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start Practitioner Categories create service
        this.pracategoriesService.createpraCategories().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.pracategoriesService.pracat.pCatTitle = '';           
            this.router.navigate([environment.practitionercategoriesList]);
          }
        });
      }
    }
  }
}
