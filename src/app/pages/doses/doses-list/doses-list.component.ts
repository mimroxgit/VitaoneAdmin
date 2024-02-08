import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DosesService } from 'src/app/services/doses.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-doses-list',
  templateUrl: './doses-list.component.html',
  styleUrls: ['./doses-list.component.css']
})
export class DosesListComponent {


  dosescreateurl = "/"+environment.dosesCreate;  
  dosesediturl   = "/" +environment.dosesEdit 
  

  doseSearch:any
  doselist:any
  doselistloading:any
  imgeUrl = environment.cdnUrl + 'Catalogue';
  
   
  isdel = false;
 
  constructor(
    public dosesService:DosesService,
    private router : Router){
    this.dsmlist()
  }

  //on change search
  onchaneg(item:any){
    this.doseSearch = item    
  }

  //set edit id
  editdsm(item:any){    
    this.router.navigate([environment.dosesEdit+"/"+item.id]);
  }

  

   //get the list from Doses
  private dsmlist() {    
    this.doselist = null;
    this.doselistloading = true;      
    this.dosesService.listDoses().subscribe({
      next: (data) => {                          
        this.doselist = data;                                            
        this.doselistloading = false;        
      },           
    });    
  }

  //delete the Doses data 
  deletedsm(item: any) {
    this.dosesService.deleteDoses(item.id).subscribe({
      next: (res) => {   
        this.dsmlist();      
        this.isdel = false;
      },      
    });
  }

}
