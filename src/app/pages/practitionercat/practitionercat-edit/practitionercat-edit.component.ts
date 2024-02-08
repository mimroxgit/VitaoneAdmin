import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PractitionercategoriesService } from 'src/app/services/practitionercategories.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-practitionercat-edit',
  templateUrl: './practitionercat-edit.component.html',
  styleUrls: ['./practitionercat-edit.component.css']
})
export class PractitionercatEditComponent {

  pracategorieslistUrl = "/" + environment.practitionercategoriesList

  Id: any;
  adminId: any;  
  pCatTitle: any;  
  pCatActive: any;

  errorCount = 0;
  nameMessage: any;
  mes: any;
  response: any;
  loading = false;

  constructor(
    public pracatalogueservice: PractitionercategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getcat(this.route.snapshot.params['id']);
  }

  
  // get the record particular Practitioner Categories
  getcat(id: any) {
    this.Id = id;
    this.loading = true
    this.pracatalogueservice.getDetail(id).subscribe({
      next: (data: any) => {
        (this.pCatTitle = data.pCatTitle),  
        (this.pCatActive = data.pCatActive)
         this.loading = false
      },
      //error: (e) => console.log(e),
    });
  }

  //post for Practitioner Categories edit
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
       this.pracatalogueservice.pracat.id = this.Id;
       this.pracatalogueservice.pracat.adminId = this.adminId;
       this.pracatalogueservice.pracat.pCatTitle = this.pCatTitle;      
       this.pracatalogueservice.pracat.pCatActive = this.pCatActive;
                   
      //loading condition start
      if (this.loading == false) {
        this.loading = true;               
        //start Practitioner Categories edit service
        this.pracatalogueservice.editpraCategories().subscribe((res:any) => {          
          this.response = res;
          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.pracatalogueservice.pracat.pCatTitle = '';            
            this.router.navigate([environment.practitionercategoriesList]);
          }
        });
      }
    }
  }
}
