import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ItemsService } from 'src/app/services/items.service';
import { PractitionercategoriesService } from 'src/app/services/practitionercategories.service';
import { SubcategoriesService } from 'src/app/services/subcategories.service';
import { environment } from 'src/environments/environments';

//add api Url
const baseURL = environment.apiUrl;

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent {

  itemscreateurl = "/"+environment.itemsCreate

  searchString1 :any
  itemslist:any
  itemslistloading:any
  imgeUrl = environment.cdnUrl + 'Product';  
  
  no=0;
  isdel = false;

   //Search
   catId="All"
   catoptions:any;
   catfilteredOptions:any;
   subcatId="All"
   subcatactlist:any;
   subcatactlistAll:any;
   subcatoptions:any;
   subcatoptionsAll:any;
   subcatfilteredOptions:any;
   pracatId="All";
   pracatoptions:any;
   pracatfilteredOptions:any;  
   

  constructor(
    public CategoriesService:CategoriesService,
    public SubCategoriesService:SubcategoriesService,
    public PraCategoriesService:PractitionercategoriesService,
    public commenservice:ItemsService,
    private router : Router){
    
    this.categorylistactive();
    this.subcategorylistactive();
    this.pracategorylistactive();
    this.itemlist();
  }

   //onchange Category dropdown serch
   oncat(name:any){      
    let catList:any=[]; 
    if(name=="-"){
      this.subcatoptions=this.subcatactlistAll;
      this.subcatfilteredOptions=this.subcatactlistAll;
     }else{
      catList=this.subcatactlistAll.filter((a:any)=>a.categoryId==name)                 
      this.subcatoptions=catList;
      this.subcatfilteredOptions=catList;      
     } 
    this.catId = name;  
   }

  //get the list from  Practitioner Category actvie
  private categorylistactive() {   
    this.CategoriesService.listActcategories().subscribe({
      next: (data) => {                
        this.catoptions = data; 
        this.catfilteredOptions = data;                 
      },     
    });
  }

  //onchange Sub Category dropdown serch
  onsubcat(name:any){    
    this.subcatId = name;  
   }

  //get the list from  Practitioner Category actvie
  private subcategorylistactive() {   
    this.SubCategoriesService.listActScategories().subscribe({
      next: (data) => {                        
        this.subcatoptions = data;         
        this.subcatfilteredOptions = data;   
        this.subcatactlist = data;
        this.subcatactlistAll = data;              
      },
    
    });
  }

  //onchange practitioner category dropdown serch
  onpracat(name:any){    
    this.pracatId = name;  
   }

  //get the list from  Practitioner Category actvie
  private pracategorylistactive() {   
    this.PraCategoriesService.listActpracategories().subscribe({
      next: (data) => {                
        this.pracatoptions = data; 
        this.pracatfilteredOptions = data;                 
      },
     // error: (e) => console.log(e),
    });
  }

  //onserch button click
  onsearch(){   
    if(this.catId=="All" || this.catId=="-" || this.catId == "" || this.catId==undefined )
    {      
      this.catId = 'All'
    } 
    if(this.subcatId=="All" || this.subcatId=="-" || this.subcatId == "" || this.subcatId==undefined )
    {      
      this.subcatId = 'All'
    }
    if(this.pracatId=="All" || this.pracatId=="-" || this.pracatId == "" || this.pracatId==undefined )
    {    
      this.pracatId = 'All'
    }  
    this.itemlist();    
  }

  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item
  }

  //set edit id
  editItem(item:any){    
    this.router.navigate([environment.itemsEdit+"/"+item.id]);
  }

   //set detail id
   detailItem(item:any){    
    this.router.navigate([environment.itemsDetails+"/"+item.id]);
  }

  //scroll
  onScroll(){
    setTimeout(()=>{
      //this.itemslistloading=true;
      this.no=this.no+1;
      const apiUrl = `${baseURL + 'AdminItems/List?no='}${this.no}&cId=${this.catId}&sId=${this.subcatId}&pId=${this.pracatId}`;
      this.commenservice.commenDataList(apiUrl).subscribe({
        next: (data:any) => {          
          this.itemslist = [...this.itemslist,...data];
          this.itemslistloading=false;
        },        
      });
    }, 0);
  }

  //get the list from Items
  private itemlist() {
    this.itemslist = null;
    this.itemslistloading = true;
    let n = 0;
    const apiUrl = `${baseURL + 'AdminItems/List?no='}${n}&cId=${this.catId}&sId=${this.subcatId}&pId=${this.pracatId}`;
    this.commenservice.commenDataList(apiUrl).subscribe({
      next: (data) => {
        
        this.itemslist = data;                
        this.onScroll();        
        this.itemslistloading = false;
       
        
      },      
    });
  }
 
  //delete the Items data 
  deleteItem(item: any) {
    this.commenservice.deleteItems(item.id).subscribe({
      next: (res) => {   
        this.itemlist();      
        this.isdel = false;
      },      
    });
  }
}
