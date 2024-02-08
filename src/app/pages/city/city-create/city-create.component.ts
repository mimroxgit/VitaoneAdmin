import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.css']
})
export class CityCreateComponent {

  citylistUrl = "/" + environment.cityList
  
  stateactivelist: any;
  name: any;
  stateId = '-';
  ctmTitle: any;
  ctmIsActive = true
  adminId: any;  

  loading = false;
  mes: any;
  response: any;
  nameMessage: any;
  statedropdownMessage: any; 
  errorCount = 0;
  @Input() Isshowselectbox = true; 

  constructor(
    public stateService: StateService,
    public cityService: CityService,
    private router: Router
  ) {   
    this.statelistactive();
  }

  //State
  onchange(id: any) {
    this.cityService.cty.stateId = id;
    this.stateId = this.cityService.cty.stateId
  }

   //get the list from State actvie
   private statelistactive() {
    this.stateactivelist = null;
    this.stateService.listActiveState().subscribe({
      next: (data) => {        
        this.stateactivelist = data;          
      },
     // error: (e) => console.log(e),
    });
  }

  //post for Sub City Create
  onSubmit(form: NgForm) {
    this.errorCount = 0;

     //state dropdown validation
     if (this.stateId == '-') {
      this.errorCount++;
      this.statedropdownMessage = 'Please select state';
    } else {
      this.statedropdownMessage = '';
    }

    //Name validation
    if (this.ctmTitle == undefined) {
      this.errorCount++;
      this.nameMessage = 'Please enter name';
    } else {
      if (this.ctmTitle.trim() == '') {
        this.errorCount++;
        this.nameMessage = 'Please enter valid name';
      } else {       
          this.nameMessage = '';       
      }
    }   

    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');

      this.cityService.cty.adminId = this.adminId;
      this.cityService.cty.ctmTitle = this.ctmTitle;     
      this.cityService.cty.state = "-"; 
      this.cityService.cty.ctmIsActive = this.ctmIsActive;

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start City create service
        this.cityService.createCity().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.cityService.cty.ctmTitle = '';           
            this.router.navigate([environment.cityList]);
          }
        });
      }
    }
  }
}
