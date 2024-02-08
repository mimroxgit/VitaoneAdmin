import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubcategoriesService } from 'src/app/services/subcategories.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-subcategories-edit',
  templateUrl: './subcategories-edit.component.html',
  styleUrls: ['./subcategories-edit.component.css']
})
export class SubcategoriesEditComponent {

  subcategorieslistUrl = "/" + environment.subcategoriesList
  @Input() Isshowlabeluploadfile = true;
  @Input() Isshowfileupload = true;
  ImagePath = environment.cdnUrl + 'SubCategory/';

  categoriesactivelist: any;
  name: any;
  catalogueId = '-';

  Id: any;
  adminId: any;  
  scatTitle: any;  
  scatActive: any;
  scatImage:any;

  errorCount = 0;
  nameMessage: any;
  catdropdownMessage:any;
  mes: any;
  response: any;
  loading = false;
  @Input() Isshowselectbox = true; 

  constructor(
    public categoriesService: CategoriesService,
    public subcategoriesService: SubcategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getscat(this.route.snapshot.params['id']);
    this.catlistactive();
  }

  //select file event itmImageGallery
  selectedfile(pimImages: string) {
   
    const itemimg = pimImages.split('||');
    this.scatImage = itemimg[0];
    this.subcategoriesService.subcat.scatImage = itemimg[0]; 
  }

   //Categories onchange DropDown
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
    });
  }

  // get the record particular Sub Categories
  getscat(id: any) {
    
    this.Id = id;
    this.loading = true
    this.subcategoriesService.getSCatDetail(id).subscribe({
      next: (data: any) => {    
            
        this.scatTitle = data.sCatTitle
        this.scatImage = this.ImagePath+data.sCatImage
        this.scatActive = data.sCatActive
        this.catalogueId = data.categoryId        
        this.loading = false        
      },
      //error: (e) => console.log(e),
    });
  }

  

  //post for Sub Categories edit
  onSubmit(form: NgForm) {
    this.errorCount = 0;

     //Category dropdown validation
     if (this.catalogueId == '-') {
      this.errorCount++;
      this.catdropdownMessage = 'Please select category';
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

    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');
       this.subcategoriesService.subcat.id = this.Id;
       this.subcategoriesService.subcat.adminId = this.adminId;
       this.subcategoriesService.subcat.categoryId = this.catalogueId;
       this.subcategoriesService.subcat.scatTitle  = this.scatTitle;  
      //  if(this.scatImage == undefined){
      //   this.subcategoriesService.subcat.scatImage  = "-"
      //  }else{
      //   this.subcategoriesService.subcat.scatImage = this.scatImage 
      //  }    
       this.subcategoriesService.subcat.scatActive = this.scatActive;
                   
      //loading condition start
      if (this.loading == false) {
        this.loading = true;               
        //start Sub Categories edit service
        this.subcategoriesService.editSCategories().subscribe((res:any) => {          
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
