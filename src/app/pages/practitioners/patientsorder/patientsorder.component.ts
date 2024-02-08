import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-patientsorder',
  templateUrl: './patientsorder.component.html',
  styleUrls: ['./patientsorder.component.css']
})
export class PatientsorderComponent {

  orderdetailsurl ="/" + environment.ordersDetails  
  seturl = localStorage.getItem('seturl')

  patientlist:any;
  patientloading = false;

  constructor(    
    public practitionersService:PractitionersService,
    private route: ActivatedRoute,
    private router: Router
  ) {   
    this.getpatient(this.route.snapshot.params['id']);   
  }

  // get the record particular Patient
  getpatient(id: any) {    
    this.patientloading = true
    this.practitionersService.getPatients(id).subscribe({
      next: (data: any) => {           
        this.patientlist = data     
        this.getPatientsOrdlist()
        this.patientloading = false        
      },      
    });
  }

  patordloading = false
  Patientsordlist :any
   // get the record  PatientsList wise OrderList
   getPatientsOrdlist() {    
    this.patordloading = true
    this.practitionersService.getPracPatientsOrd(this.route.snapshot.params['id']).subscribe({
      next: (data: any) => {                
        this.Patientsordlist = data                                          
        this.patordloading = false        
      },
      //error: (e) => console.log(e),
    });
  }

  searchString = '';
  //onchange type search
  onchaneg(item:any){
   this.searchString = item    
  }
}
