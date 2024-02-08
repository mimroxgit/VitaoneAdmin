import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DosesService } from 'src/app/services/doses.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-doses-create',
  templateUrl: './doses-create.component.html',
  styleUrls: ['./doses-create.component.css']
})
export class DosesCreateComponent {

  categorieslistUrl = "/" + environment.dosesList

  dsmTitle: any;
  dsmActive = true
  adminId: any;  

  loading = false;
  mes: any;
  response: any;
  dsmnameMessage: any; 
  errorCount = 0;

  constructor(
    public doseService: DosesService,
    private router: Router
  ) {   
    
  }
   
  //post for doses Create
  onSubmit(form: NgForm) {
    this.errorCount = 0;

    //Name validation
    if (this.dsmTitle == undefined) {
      this.errorCount++;
      this.dsmnameMessage = 'Please enter title';
    } else {
      if (this.dsmTitle.trim() == '') {
        this.errorCount++;
        this.dsmnameMessage = 'Please enter valid title';
      } else {       
          this.dsmnameMessage = '';       
      }
    }   

    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');

      this.doseService.dose.adminId = this.adminId;
      this.doseService.dose.dsmTitle = this.dsmTitle;      
      this.doseService.dose.dsmActive = this.dsmActive;

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start doses create service
        this.doseService.createDoses().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.doseService.dose.dsmTitle = '';
            this.router.navigate([environment.dosesList]);
          }
        });
      }
    }
  }

}
