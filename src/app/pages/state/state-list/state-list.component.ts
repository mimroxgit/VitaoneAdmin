import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css']
})
export class StateListComponent {

  searchString1 :any 
  statecreateurl="/"+environment.stateCreate  
  stateediturl   = "/" +environment.stateEdit 
  
  statelist:any
  statelistloading:any
  
  tableThlist2= ['Name']
  tableTdlist = ['stmName']
  //fieldName is show Delete popmenu Name
  fieldName = "stmName";
  //statusName is show Active & DeActive  Name
  statusName = "stmIsActive"
  scatname:any
  
  no=0;
  isdel = false;
 
  constructor(
    public stateService:StateService,   
    private router : Router){    
      this.statlist();
  }
 
  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

  //set edit id
  editstate(item:any){    
    this.router.navigate([environment.stateEdit+"/"+item.id]);
  }

  //get the list from State
  private statlist() {
    this.statelist = null;
    this.statelistloading = true;
    this.stateService.listState().subscribe({
      next: (data: any) => {                
        this.statelist = data;
        this.statelistloading = false;
      },
    });
  }
 
  //delete the State data 
  deletestate(item: any) {
    this.stateService.deleteState(item.id).subscribe({
      next: (res) => {   
        this.statlist();      
        this.isdel = false;
      },      
    });
  }
}
