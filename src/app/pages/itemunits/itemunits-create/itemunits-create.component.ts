import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemunitsService } from 'src/app/services/itemunits.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-itemunits-create',
  templateUrl: './itemunits-create.component.html',
  styleUrls: ['./itemunits-create.component.css']
})
export class ItemunitsCreateComponent {

  itemunitslistUrl = "/" + environment.itemunitsList

  adminId: any; 
  umTitle: any;
  umIsActive = true
   
  loading = false;
  mes: any;
  response: any;
  nameMessage: any; 
  errorCount = 0;

  constructor(
    public itemunitsService: ItemunitsService,
    private router: Router
  ) {   
    
  }
   
  //post for Item Units Create
  onSubmit(form: NgForm) {
    this.errorCount = 0;

    //Name validation
    if (this.umTitle == undefined) {
      this.errorCount++;
      this.nameMessage = 'Please enter name';
    } else {
      if (this.umTitle.trim() == '') {
        this.errorCount++;
        this.nameMessage = 'Please enter valid name';
      } else {       
          this.nameMessage = '';       
      }
    }   

    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');

      this.itemunitsService.itus.adminId = this.adminId;
      this.itemunitsService.itus.umTitle = this.umTitle;      
      this.itemunitsService.itus.umIsActive = this.umIsActive;

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start Item Units create service
        this.itemunitsService.createItemunits().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.itemunitsService.itus.umTitle = '';           
            this.router.navigate([environment.itemunitsList]);
          }
        });
      }
    }
  }
}
