import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DosesService } from 'src/app/services/doses.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-doses-edit',
  templateUrl: './doses-edit.component.html',
  styleUrls: ['./doses-edit.component.css']
})
export class DosesEditComponent {

  doselistUrl = "/" + environment.dosesList

  Id: any;
  dsmTitle: any;
  adminId: any;  
  dsmActive: any;

  errorCount = 0;
  dsmnameMessage: any;
  mes: any;
  response: any;
  loading = false;

  constructor(
    public doseservice: DosesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getdsm(this.route.snapshot.params['id']);
  }

  
  // get the record particular Doses
  getdsm(id: any) {
    this.Id = id;
    this.loading = true
    this.doseservice.getDoses(id).subscribe({
      next: (data: any) => {
        (this.dsmTitle = data.dsmTitle),  
        (this.dsmActive = data.dsmActive)
         this.loading = false
      },
      //error: (e) => console.log(e),
    });
  }

  //post for Doses edit
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
       this.doseservice.dose.id = this.Id;
       this.doseservice.dose.adminId = this.adminId;
       this.doseservice.dose.dsmTitle = this.dsmTitle;      
       this.doseservice.dose.dsmActive = this.dsmActive;
                   
      //loading condition start
      if (this.loading == false) {
        this.loading = true;               
        //start Doses edit service
        this.doseservice.editDoses().subscribe((res:any) => {          
          this.response = res;
          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.doseservice.dose.dsmTitle = '';            
            this.router.navigate([environment.dosesList]);
          }
        });
      }
    }
  }

}
