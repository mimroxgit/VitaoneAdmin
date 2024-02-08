import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.css']
})
export class CategoriesCreateComponent {

  categorieslistUrl = "/" + environment.categoriesList
  @Input() Isshowlabeluploadfile = true;
  @Input() Isshowfileupload = true;

  catTitle: any;
  catActive = true
  catimageUrl: any;
  adminId: any;  

  loading = false;
  mes: any;
  response: any;
  nameMessage: any; 
  catImageMessage:any;
  errorCount = 0;
  catImage :any
  constructor(
    public categoriesService: CategoriesService,
    private router: Router
  ) {   
    
  }

  //select file event itmImageGallery
  selectedfile(pimImages: string) {    
    const itemimg = pimImages.split("||");
    this.catImage = pimImages    
    this.catimageUrl = itemimg[0];
  }
   
  //post for categories Create
  onSubmit(form: NgForm) {
    this.errorCount = 0;

    //Name validation
    if (this.catTitle == undefined) {
      this.errorCount++;
      this.nameMessage = 'Please enter name';
    } else {
      if (this.catTitle.trim() == '') {
        this.errorCount++;
        this.nameMessage = 'Please enter valid name';
      } else {       
          this.nameMessage = '';       
      }
    }   

    //Image validation
    if (this.catimageUrl == undefined) {
      this.errorCount++;
      this.catImageMessage = 'Please select image';
    } else {
      this.catImageMessage = '';
    }

    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');

      this.categoriesService.cat.adminId = this.adminId;
      this.categoriesService.cat.catTitle = this.catTitle; 
      if(this.catImage == undefined ){
        this.categoriesService.cat.CatImage = "-"
      } else{
        this.categoriesService.cat.CatImage = this.catImage
      }    
      this.categoriesService.cat.catActive = this.catActive;

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start categories create service
        this.categoriesService.createCategories().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.categoriesService.cat.catTitle = '';
            this.router.navigate([environment.categoriesList]);
          }
        });
      }
    }
  }
  
}
