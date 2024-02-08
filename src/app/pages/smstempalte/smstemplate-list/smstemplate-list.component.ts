import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SmstempalteService } from 'src/app/services/smstempalte.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-smstemplate-list',
  templateUrl: './smstemplate-list.component.html',
  styleUrls: ['./smstemplate-list.component.css']
})
export class SmstemplateListComponent {
  
  searchString1 :any 
  smsTemplatecreateurl="/"+environment.smsTemplateCreate
  
  smsTemplatelist:any
  smsTemplatelistloading:any
  
  tableThlist2= ['Name','Type','Message']
  tableTdlist = ['smsTitle','smsType','smsMessage']
  //fieldName is show Delete popmenu Name
  fieldName = "smsTitle";
  //statusName is show Active & DeActive  Name
  statusName = "smsIsActive"
  scatname:any
  
  no=0;
  isdel = false;
 
  constructor(
    public SmsservicesService: SmstempalteService,   
    private router : Router){    
      this.smstemplatelist();
  }
 
  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

  //set edit id
  editsmsTemplate(item:any){    
    this.router.navigate([environment.smsTemplateEdit+"/"+item.id]);
  }

  //get the list from State
  private smstemplatelist() {
    this.smsTemplatelist = null;
    this.smsTemplatelistloading = true;
    this.SmsservicesService.listSmstemplate().subscribe({
      next: (data: any) => {                                
        this.smsTemplatelist = data;
        this.smsTemplatelistloading = false;
      },
    });
  }
 
  //delete the State data 
  deletesmstemplatelist(item: any) {    
    this.SmsservicesService.deleteSmstemplate(item.id).subscribe({
      next: (res) => {   
        this.smstemplatelist();      
        this.isdel = false;
      },      
    });
  }

}
