import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {


  searchString :any 
  //countrycreateurl="/"+environment.countryCreate  
  //countryediturl   = "/" +environment.countryEdit 
  patientdetailsurl   = "/" +environment.patientDetails 
  
  p: number = 1;
  patientlist:any
  patientlistloading:any

  //Search
  @Input() Isshowselectbox = true; 
  fromDate="-";
  toDate="-";   
  registerByDD:any = [{"Name":"Manual"},{"Name":"Self"}];
  practitionerId="All"
  pracatoptions:any;
  pracatfilteredOptions:any;
  regBy="All"

  //onchange Practitioner dropdown serch
  onPrac(name:any){               
    this.practitionerId = name;  
   }
  
  
  
  no=0;
  isdel = false;  

  constructor(
    public patientService:PatientService,  
    public practitionerService:PractitionersService,
    private router : Router){     
      this.ptnlist();
      this.Practitioneractive();
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

    /*payment  mode dropdown*/
    regBydd(event:any){   
      if(event.target.value == "-"){
        this.regBy = "All"
      } else{
        this.regBy=event.target.value;
      }   
     
      }

  //onchange type search
  onchaneg(item:any){
    this.searchString = item    
  }

  

   //get the list from Country
   private ptnlist() {
    this.patientlist = null;
    this.patientlistloading = true;
    this.patientService.listPatient(this.fromDate,this.toDate,this.practitionerId,this.regBy).subscribe({
      next: (data: any) => {                       
        this.patientlist = data;
        this.patientlistloading = false;
      },
    });
  }

   //onserch button click
   onsearch(){
    if( this.fromDate=="-" || this.fromDate == "" || this.fromDate==undefined )
    {
      this.fromDate = '-'
    }
    if( this.toDate=="-" || this.toDate == "" || this.toDate==undefined )
    {
      this.toDate = '-'
    }
    
    if(this.practitionerId=="All" || this.practitionerId=="-" || this.practitionerId == "" || this.practitionerId==undefined )
    {
      
      this.practitionerId = 'All'
    }
    if(this.regBy=="All" || this.regBy=="-" || this.regBy == "" || this.regBy==undefined )
    {
      
      this.regBy = 'All'
    }
   
    this.ptnlist();
  }

  

}
