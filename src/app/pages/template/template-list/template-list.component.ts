import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent {

  searchString1 :any 
  templatecreateurl = "/"+environment.templateCreate;      
  
  
  templatelist:any
  templatelistloading:any
  
  tableThlist2= ['Name']
  tableTdlist = ['tmpTitle']
  //fieldName is show Delete popmenu Name
  fieldName = "tmpTitle";
  //statusName is show Active & DeActive  Name
  statusName = "tmpIsActive"
  scatname:any
  
 
  isdel = false;
 
  constructor(
    public templateService:TemplateService,   
    private router : Router){    
      this.temlist();
  }
 
  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

  //set edit id
  edittemplate(item:any){    
    this.router.navigate([environment.templateEdit+"/"+item.id]);
  }

  //get the list from Template
  private temlist() {
    this.templatelist = null;
    this.templatelistloading = true;
    this.templateService.listTemplate().subscribe({
      next: (data: any) => {                      
        this.templatelist = data;
        this.templatelistloading = false;
      },
    });
  }
 
  //delete the Template data 
  deletetmp(item: any) {
    this.templateService.deleteTemplate(item.id).subscribe({
      next: (res) => {   
        this.temlist();      
        this.isdel = false;
      },      
    });
  }

}
