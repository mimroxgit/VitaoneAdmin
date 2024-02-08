import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubcategoriesService } from 'src/app/services/subcategories.service';
import { environment } from 'src/environments/environments';

//add api Url
const baseURL = environment.apiUrl;

@Component({
  selector: 'app-subcategories-list',
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.css']
})
export class SubcategoriesListComponent {

  searchString1 :any 
  subCatcreateurl="/"+environment.subcategoriesCreate  
  subCatediturl   = "/" +environment.subcategoriesEdit 
  
  subcategorielist:any
  subcategorielistloading:any
  
  tableThlist2= ['Image','Category', 'Sub Category']
  tableTdlist = ['categoryImage','categoryName','name']

  
  //fieldName is show Delete popmenu Name
  fieldName = "name";
  //statusName is show Active & DeActive  Name
  statusName = "status"
  scatname:any
  
  no=0;
  isdel = false;
 
  //serach
  categoriesActive:any
  catId="All"
  options:any;
  filteredOptions:any;

  constructor(
    public commenservice:SubcategoriesService,
    public catActiveservice:CategoriesService,
    private router : Router){
      this.catActlist();
      this.scatlist();
  }

  //onchange dropdown serch
  onchange(name:any){    
    this.catId = name;  
   }

  //get the list from Active categories dropdown(search)
  private catActlist(){
    this.categoriesActive = null;
    this.catActiveservice.listActcategories().subscribe(response => {
      this.options=response;      
      this.filteredOptions = response;
    })
  }

  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

  //set edit id
  editsubCat(item:any){    
    this.router.navigate([environment.subcategoriesEdit+"/"+item.id]);
  }

  //onserch button click
  onsearch(){
    if(this.catId=="All" || this.catId=="-")
    {
      this.scatlist();
      this.catId = 'All'
    }
    else if(this.catId=="-")
    {
      alert("Please select search Categories");
    }
    else{
      this.scatlist();
    }
  }

  //scroll
  onScroll(){
    setTimeout(()=>{
     // this.subcategorielistloading=true;
      this.no=this.no+1;
      const apiUrl = `${baseURL + 'AdminSubCategories/List?no='}${this.no}&cat=${this.catId}`;
      this.commenservice.commenDataList(apiUrl).subscribe({
        next: (data:any) => {
          this.subcategorielist = [...this.subcategorielist,...data];                    
          this.subcategorielistloading=false;
        },
        // error: (e) => console.log(e),
      });
    }, 0);
  }

  //get the list from Sub Categories
  private scatlist() {    
    this.subcategorielist = null;
    this.subcategorielistloading = true;
    let n = 0;
    const apiUrl = `${baseURL + 'AdminSubCategories/List?no='}${n}&cat=${this.catId}`;
    this.commenservice.commenDataList(apiUrl).subscribe({
      next: (data) => {                                        
        this.subcategorielist = data;                 
        this.onScroll();                  
        this.subcategorielistloading = false;
      },          
    });    
  }

  //delete the Sub Categories data 
  deletesubCat(item: any) {
    this.commenservice.deleteSCategories(item.id).subscribe({
      next: (res) => {   
        this.scatlist();      
        this.isdel = false;
      },      
    });
  }
}
