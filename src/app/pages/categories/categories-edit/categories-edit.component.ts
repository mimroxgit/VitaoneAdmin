import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent {

  categorieslistUrl = "/" + environment.categoriesList
  @Input() Isshowlabeluploadfile = true;
  @Input() Isshowfileupload = true;
  ImagePath = environment.cdnUrl + 'Category/';

  Id: any;
  catTitle: any;
  adminId: any;  
  catActive: any;
  catImage:any;

  errorCount = 0;
  nameMessage: any;
  mes: any;
  response: any;
  loading = false;

  constructor(
    public catalogueservice: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getcat(this.route.snapshot.params['id']);
  }

  //select file event itmImageGallery
  selectedfile(pimImages: string) {
   
    const itemimg = pimImages.split('||');
    this.catImage = itemimg[0];
    this.catalogueservice.cat.CatImage = itemimg[0];
  }
  
  // get the record particular Categories
  getcat(id: any) {
    this.Id = id;
    this.loading = true
    this.catalogueservice.getDetail(id).subscribe({
      next: (data: any) => {
       
        (this.catTitle = data.catTitle),  
        (this.catImage =  this.ImagePath+data.catImage),
        (this.catActive = data.catActive)                 
         this.loading = false
      },
      //error: (e) => console.log(e),
    });
  }

  //post for Categories edit
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

   

    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');
       this.catalogueservice.cat.id = this.Id;
       this.catalogueservice.cat.adminId = this.adminId;
      //  if(this.catImage == undefined){
      //   this.catalogueservice.cat.CatImage  = "-"
      //  }else{
      //   this.catalogueservice.cat.CatImage = this.catImage 
      //  }
       this.catalogueservice.cat.catTitle = this.catTitle;      
       this.catalogueservice.cat.catActive = this.catActive;
                   
      //loading condition start
      if (this.loading == false) {
        this.loading = true;               
        //start Categories edit service
        this.catalogueservice.editCategories().subscribe((res:any) => {          
          this.response = res;
          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.catalogueservice.cat.catTitle = '';            
            this.router.navigate([environment.categoriesList]);
          }
        });
      }
    }
  }
}
