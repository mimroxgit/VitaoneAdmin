import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemunitsService } from 'src/app/services/itemunits.service';
import { environment } from 'src/environments/environments';

//add api Url
const baseURL = environment.apiUrl;

@Component({
  selector: 'app-itemunits-list',
  templateUrl: './itemunits-list.component.html',
  styleUrls: ['./itemunits-list.component.css']
})
export class ItemunitsListComponent {

  itemunitscreateurl = "/"+environment.itemunitsCreate;  
  itemunitsediturl   = "/" +environment.itemunitsEdit 
  
  unitSearch:any
  itemunitslist:any;
  itemunitslistloading:any;
  umTitle:any;
  
  no=0;
  isdel = false;
 
  constructor(
    public commenservice:ItemunitsService,
    private router : Router){
    this.itemUnitlist()
  }

  //on change search
  onchaneg(item:any){
    this.unitSearch = item    
  }

  //set edit id
  editItemUnit(item:any){    
    this.router.navigate([environment.itemunitsEdit+"/"+item.id]);
  }

   //scroll
   onScroll(){    
    
      setTimeout(()=>{
        //this.itemunitslistloading=true;
        this.no=this.no+1;        
        const apiUrl = `${baseURL + 'AdminUnit/List?no='}${this.no}`;
      this.commenservice.commenDataList(apiUrl).subscribe({
        next: (data:any) => {
          this.itemunitslist = [...this.itemunitslist,...data];                                       
          this.itemunitslistloading=false;
        },
      
      });
      }, 0);  
    
       
   }

  //get the list from Item Unit
  private itemUnitlist() {
    
    this.itemunitslist = null;
    this.itemunitslistloading = true;
    let n = 0;
    const apiUrl = `${baseURL + 'AdminUnit/List?no='}${n}`;
    this.commenservice.commenDataList(apiUrl).subscribe({
      next: (data) => {                          
        this.itemunitslist = data;                     
        this.onScroll();                  
        this.itemunitslistloading = false;
        
      },
      
     // error: (e) => console.log(e),
    });
    
  }

  //delete the Item Unit data 
  deleteItemUnit(item: any) {
    this.commenservice.deleteItemunits(item.id).subscribe({
      next: (res) => {   
        this.itemUnitlist();      
        this.isdel = false;
      },      
    });
  }
}
