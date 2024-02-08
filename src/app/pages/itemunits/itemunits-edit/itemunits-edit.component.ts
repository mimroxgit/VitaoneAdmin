import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemunitsService } from 'src/app/services/itemunits.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-itemunits-edit',
  templateUrl: './itemunits-edit.component.html',
  styleUrls: ['./itemunits-edit.component.css']
})
export class ItemunitsEditComponent {

  itemunitslistUrl = "/" + environment.itemunitsList

  
  Id: any;
  adminId: any;  
  umTitle: any;  
  umIsActive: any;

  errorCount = 0;
  nameMessage: any;
  mes: any;
  response: any;
  loading = false;

  constructor(
    public itemunitsService: ItemunitsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getitus(this.route.snapshot.params['id']);
  }

  
  // get the record particular Item Units
  getitus(id: any) {
    this.Id = id;
    this.loading = true
    this.itemunitsService.getDetail(id).subscribe({
      next: (data: any) => {
        (this.umTitle = data.umTitle),  
        (this.umIsActive = data.umIsActive)
         this.loading = false
      },
      //error: (e) => console.log(e),
    });
  }

  //post for Item Units edit
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
       this.itemunitsService.itus.id = this.Id;
       this.itemunitsService.itus.adminId = this.adminId;
       this.itemunitsService.itus.umTitle = this.umTitle;      
       this.itemunitsService.itus.umIsActive = this.umIsActive;
                   
      //loading condition start
      if (this.loading == false) {
        this.loading = true;               
        //start Item Units edit service
        this.itemunitsService.editItemunits().subscribe((res:any) => {          
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
