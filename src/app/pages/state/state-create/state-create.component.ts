import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-state-create',
  templateUrl: './state-create.component.html',
  styleUrls: ['./state-create.component.css']
})
export class StateCreateComponent {

  statelistUrl = "/" + environment.stateList

  stmName:any;
  stmIsActive= true  
  adminId: any;  

  loading = false;
  mes: any;
  response: any;
  nameMessage: any; 
  errorCount = 0;

  constructor(
    public stateService: StateService,
    private router: Router
  ) {   
    
  }
   
  //post for State Create
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

      this.stateService.state.adminId = this.adminId;
      this.stateService.state.stmName = this.stmName;      
      this.stateService.state.stmIsActive = this.stmIsActive;

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start State create service
        this.stateService.createState().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.stateService.state.stmName = '';           
            this.router.navigate([environment.stateList]);
          }
        });
      }
    }
  }
}
