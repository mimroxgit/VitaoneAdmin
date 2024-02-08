import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.css']
})
export class CityEditComponent {

  citylistUrl = "/" + environment.cityList;

  stateactivelist: any;
  stmName: any;
  stateId = '-';

  Id: any;
  adminId: any;  
  ctmTitle: any;  
  ctmIsActive: any;

  errorCount = 0;
  nameMessage: any;
  statedropdownMessage:any;
  mes: any;
  response: any;
  loading = false;
  @Input() Isshowselectbox = true; 

  constructor(
    public stateService: StateService,
    public cityService: CityService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getscty(this.route.snapshot.params['id']);    
  }

   //State onchange DropDown
   onchange(id: any) {
    this.cityService.cty.stateId = id;
    this.stateId = this.cityService.cty.stateId;
  }

  //get the list from State actvie
  private satlistactive() {
    this.stateactivelist = null;
    this.stateService.listActiveState().subscribe({
      next: (data) => {        
        this.stateactivelist = data;
      },
    });
  }

  // get the record particular City
  getscty(id: any) {
    
    this.Id = id;
    this.loading = true
    this.cityService.getCity(id).subscribe({
      next: (data: any) => {         
        this.ctmTitle = data.ctmTitle
        this.ctmIsActive = data.ctmIsActive
        this.stateId = data.stateId  
        this.satlistactive();      
        this.loading = false        
      },
      //error: (e) => console.log(e),
    });
  }

  

  //post for Sub City edit
  onSubmit(form: NgForm) {
    this.errorCount = 0;

     //Category dropdown validation
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
       this.cityService.cty.id = this.Id;
       this.cityService.cty.adminId = this.adminId;
       this.cityService.cty.state  = "-"      
       this.cityService.cty.stateId = this.stateId;
       this.cityService.cty.ctmTitle  = this.ctmTitle;         
       this.cityService.cty.ctmIsActive = this.ctmIsActive;
                   
      //loading condition start
      if (this.loading == false) {
        this.loading = true;               
        //start Sub City edit service
        this.cityService.editCity().subscribe((res:any) => {          
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
