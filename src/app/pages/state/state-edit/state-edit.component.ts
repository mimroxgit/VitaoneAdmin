import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-state-edit',
  templateUrl: './state-edit.component.html',
  styleUrls: ['./state-edit.component.css']
})
export class StateEditComponent {

  statelistUrl = "/" + environment.stateList

  Id: any;
  stmName: any;
  adminId: any;  
  stmIsActive: any;

  errorCount = 0;
  nameMessage: any;
  mes: any;
  response: any;
  loading = false;

  constructor(
    public StateService: StateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getState(this.route.snapshot.params['id']);
  }

  
  // get the record particular State
  getState(id: any) {
    this.Id = id;
    this.loading = true
    this.StateService.getState(id).subscribe({
      next: (data: any) => {
        (this.stmName = data.stmName),  
        (this.stmIsActive = data.stmIsActive)
         this.loading = false
      },
      //error: (e) => console.log(e),
    });
  }

  //post for State edit
  onSubmit(form: NgForm) {
    this.errorCount = 0;
    
    //Name validation
    if (this.stmName == undefined) {
      this.errorCount++;
      this.nameMessage = 'Please enter name';
    } else {
      if (this.stmName.trim() == '') {
        this.errorCount++;
        this.nameMessage = 'Please enter valid name';
      } else {        
          this.nameMessage = '';        
      }
    }   

    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');
       this.StateService.state.id = this.Id;
       this.StateService.state.adminId = this.adminId;
       this.StateService.state.stmName = this.stmName;      
       this.StateService.state.stmIsActive = this.stmIsActive;
                   
      //loading condition start
      if (this.loading == false) {
        this.loading = true;               
        //start State edit service
        this.StateService.editState().subscribe((res:any) => {          
          this.response = res;
          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.StateService.state.stmName = '';            
            this.router.navigate([environment.stateList]);
          }
        });
      }
    }
  }
}
