import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PractitionercategoriesService } from 'src/app/services/practitionercategories.service';
import { environment } from 'src/environments/environments';

//add api Url
const baseURL = environment.apiUrl;

@Component({
  selector: 'app-practitionercat-list',
  templateUrl: './practitionercat-list.component.html',
  styleUrls: ['./practitionercat-list.component.css']
})
export class PractitionercatListComponent {

  Pracategoriescreateurl = "/"+environment.practitionercategoriesCreate;  
  Pracategoriesediturl   = "/" +environment.practitionercategoriesEdit 
  

  pracatSearch:any
  pracategorielist:any;
  pracategorielistloading:any;  
  no=0;
  isdel = false;
 
  constructor(
    public commenservice:PractitionercategoriesService,
    private router : Router){
    this.parcatlist()
  }

  //on change search
  onchaneg(item:any){
    this.pracatSearch = item    
  }

  //set edit id
  editPraCat(item:any){    
    this.router.navigate([environment.practitionercategoriesEdit+"/"+item.id]);
  }

   //scroll
   onScroll(){    
    
      setTimeout(()=>{
       // this.pracategorielistloading=true;
        this.no=this.no+1;        
        const apiUrl = `${baseURL + 'AdminPractitionerCategories/List?no='}${this.no}`;
      this.commenservice.commenDataList(apiUrl).subscribe({
        next: (data:any) => {
          this.pracategorielist = [...this.pracategorielist,...data];                                       
          this.pracategorielistloading=false;
        },
       // error: (e) => console.log(e),
      });
      }, 0);  
    
       
   }

   //get the list from Practitioner Categories
  private parcatlist() {    
    this.pracategorielist = null;
    this.pracategorielistloading = true;
    let n = 0;
    const apiUrl = `${baseURL + 'AdminPractitionerCategories/List?no='}${n}`;
    this.commenservice.commenDataList(apiUrl).subscribe({
      next: (data) => {                          
        this.pracategorielist = data;                  
        this.onScroll();                  
        this.pracategorielistloading = false;
        
      },
      
     // error: (e) => console.log(e),
    });
    
  }
  
  //delete the Practitioner Categories data 
  deleteParCat(item: any) {
    this.commenservice.deletepraCategories(item.id).subscribe({
      next: (res) => {   
        this.parcatlist();      
        this.isdel = false;
      },      
    });
  }
}
