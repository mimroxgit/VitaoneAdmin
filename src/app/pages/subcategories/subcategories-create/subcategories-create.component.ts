import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubcategoriesService } from 'src/app/services/subcategories.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-subcategories-create',
  templateUrl: './subcategories-create.component.html',
  styleUrls: ['./subcategories-create.component.css']
})
export class SubcategoriesCreateComponent {

  subcategorieslistUrl = "/" + environment.subcategoriesList
  
  @Input() Isshowlabeluploadfile = true;
  @Input() Isshowfileupload = true;
  categoriesactivelist: any;
  name: any;
  catalogueId = '-';
  scatTitle: any;
  scatImage :any;
  scatimageUrl: any;
  scatActive = true
  adminId: any;  

  loading = false;
  mes: any;
  response: any;
  nameMessage: any;
  catdropdownMessage: any; 
  subcatImageMessage:any
  errorCount = 0;
  @Input() Isshowselectbox = true; 

  constructor(
    public categoriesService: CategoriesService,
    public subcategoriesService: SubcategoriesService,
    private router: Router
  ) {   
    this.catlistactive();
  }

  //select file event itmImageGallery
  selectedfile(pimImages: string) {    
    const itemimg = pimImages.split("||");
    this.scatImage = pimImages    
    this.scatimageUrl = itemimg[0];
  }

  //Categories
  onchange(id: any) {
    this.subcategoriesService.subcat.categoryId = id;
    this.catalogueId = this.subcategoriesService.subcat.categoryId;
  }

   //get the list from Categories actvie
   private catlistactive() {
    this.categoriesactivelist = null;
    this.categoriesService.listActcategories().subscribe({
      next: (data) => {
        this.categoriesactivelist = data;          
      },
     // error: (e) => console.log(e),
    });
  }

  //post for Sub Categories Create
  onSubmit(form: NgForm) {
    this.errorCount = 0;

     //Category dropdown validation
     if (this.catalogueId == '-') {
      this.errorCount++;
      this.catdropdownMessage = 'Please select Category';
    } else {
      this.catdropdownMessage = '';
    }

    //Name validation
    if (this.scatTitle == undefined) {
      this.errorCount++;
      this.nameMessage = 'Please enter name';
    } else {
      if (this.scatTitle.trim() == '') {
        this.errorCount++;
        this.nameMessage = 'Please enter valid name';
      } else {       
          this.nameMessage = '';       
      }
    }   

     //Image validation
     if (this.scatimageUrl == undefined) {
      this.errorCount++;
      this.subcatImageMessage = 'Please select image';
    } else {
      this.subcatImageMessage = '';
    }

    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');

      this.subcategoriesService.subcat.adminId = this.adminId;
      this.subcategoriesService.subcat.scatTitle = this.scatTitle;   
      if(this.scatImage == undefined ){
        this.subcategoriesService.subcat.scatImage = "-"
      } else{
        this.subcategoriesService.subcat.scatImage = this.scatImage
      }    
      this.subcategoriesService.subcat.scatActive = this.scatActive;

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start Sub Categories create service
        this.subcategoriesService.createSCategories().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.subcategoriesService.subcat.scatTitle = '';           
            this.router.navigate([environment.subcategoriesList]);
          }
        });
      }
    }
  }
}
