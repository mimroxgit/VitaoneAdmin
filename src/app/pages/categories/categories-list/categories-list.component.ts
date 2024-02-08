import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { environment } from 'src/environments/environments';

//add api Url
const baseURL = environment.apiUrl;

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent {

  categoriescreateurl = "/"+environment.categoriesCreate;  
  categoriesediturl   = "/" +environment.categoriesEdit 
  

  catSearch:any
  categorielist:any
  categorielistloading:any
  imgeUrl = environment.cdnUrl + 'Catalogue';
  catname:any
  
  no=0;
  isdel = false;
 
  constructor(
    public commenservice:CategoriesService,
    private router : Router){
    this.catlist()
  }

  //on change search
  onchaneg(item:any){
    this.catSearch = item    
  }

  //set edit id
  editCat(item:any){    
    this.router.navigate([environment.categoriesEdit+"/"+item.id]);
  }

   //scroll
   onScroll(){    
    
      setTimeout(()=>{
        //this.categorielistloading=true;
        this.no=this.no+1;        
        const apiUrl = `${baseURL + 'AdminCategories/List?no='}${this.no}`;
      this.commenservice.commenDataList(apiUrl).subscribe({
        next: (data:any) => {
          this.categorielist = [...this.categorielist,...data];                                       
          this.categorielistloading=false;
        },
      
      });
      }, 0);  
    
       
   }

   //get the list from Categories
  private catlist() {
    
    this.categorielist = null;
    this.categorielistloading = true;
    let n = 0;
    const apiUrl = `${baseURL + 'AdminCategories/List?no='}${n}`;
    this.commenservice.commenDataList(apiUrl).subscribe({
      next: (data) => {                          
        this.categorielist = data;                  
        this.onScroll();                  
        this.categorielistloading = false;
        
      },
      
     // error: (e) => console.log(e),
    });
    
  }

  //delete the Categories data 
  deleteCat(item: any) {
    this.commenservice.deleteCategories(item.id).subscribe({
      next: (res) => {   
        this.catlist();      
        this.isdel = false;
      },      
    });
  }
}
