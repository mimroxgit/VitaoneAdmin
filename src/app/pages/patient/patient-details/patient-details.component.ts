import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent {

  patientlistUrl = "/"+ environment.patientList
  patientId :any;
  adminId: any;  
  loading = false;
  errorCount = 0;
  mes: any;
  response: any;


  pracatoptions:any;
  pracatfilteredOptions:any;
  practitionerId="All"
  pradropdownMessage:any;
  isall=false


  constructor(
    public practitionerService:PractitionersService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.Practitioneractive();
    this.patientId =this.route.snapshot.params['id']
    
  }


  //get the list from  Practitioner Category actvie
  private Practitioneractive() {   
    this.practitionerService.PractitionerDD().subscribe({
      next: (data) => {                   
        this.pracatoptions = data; 
        this.pracatfilteredOptions = data;                 
      },
     // error: (e) => console.log(e),
    });
  }

  //onchange Practitioner dropdown serch
  onPrac(name:any){               
    this.practitionerId = name;  
   }


  //post for assign practitioner update
  onSubmit(form: NgForm){

    this.errorCount = 0;

    //practitioner dropdown validation
    if (this.practitionerId == 'All') {
      this.errorCount++;
      this.pradropdownMessage = 'Please select practitioner';
    } else {
      this.pradropdownMessage = '';
    }
    
    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');

      this.practitionerService.assPractitioners.adminId = this.adminId;
      this.practitionerService.assPractitioners.patientId = this.patientId; 
      this.practitionerService.assPractitioners.practitionerId = this.practitionerId; 
            

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start assign practitioner create service
        this.practitionerService.assignPractitioners().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;            
            this.router.navigate([environment.patientList]);
          }
        });
      }
    }
  }

  

}
