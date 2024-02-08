import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { environment } from 'src/environments/environments';


@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.css'],
  
})
export class TemplateCreateComponent {

  templatelistUrl = "/" + environment.templateList

  tmpTitle:any
  tmpIsActive = true
  adminId: any;  
  

  itmSearch:any
  loading = false;
  mes: any;
  response: any;
  tmpnameMessage:any;
  itmnameMessage:any;
  errorCount = 0;

  constructor(
    public templateService: TemplateService,
    private fb:FormBuilder,
    private router: Router
  ) {   
    this.itmlist()
  } 

  
  itmId:any
  Itemlist:any
  Itemlistloading:any
  TemplateItems:any=[];

  itmoptions:any;
  itmfilteredOptions:any;
  //get the list from Item
  private itmlist() {    
    this.Itemlist = null;
    this.Itemlistloading = true;      
    this.templateService.listActiveItem().subscribe({
      next: (data) => {              
        this.itmoptions =data
        this.itmfilteredOptions = data;         
        this.Itemlist = data;             
        this.Itemlistloading = false;        
      },           
    });    
  }

  //select change
  oncat(itm:any){
    if(itm.id!=undefined)
    {
      var d = this.TemplateItems.filter((t:any)=>t.id==itm.id);      
      if(d.length==0)
      {
        let item={
          title:itm.title,
          id:itm.id,   
          image :itm.image      
        }
        this.TemplateItems.push(item);
      }      
    }       
  }

  Item:any;
  //setModalpopup
  setModalpopup(item:any){    
    this.Item=item;
  }

  //delete Item 
  deleteItem(itm:any){   
      this.TemplateItems.forEach((element:any,index:any) => {
        if(element.id==itm.id)
        {
          this.TemplateItems.splice(index,1);
        }
      });   
  }
  
  //post for template Create
  onSubmit(form: NgForm) {
    this.errorCount = 0;
    // let itemId:any=[];
    // this.TemplateItems.forEach((element:any,index:any) => {
    //   let item={
    //     id:element.id
    //   }
    //   itemId.push(item);
    // });
       
    //Name validation
    if (this.tmpTitle == undefined) {
      this.errorCount++;
      this.tmpnameMessage = 'Please enter title';
    } else {
      if (this.tmpTitle.trim() == '') {
        this.errorCount++;
        this.tmpnameMessage = 'Please enter valid title';
      } else {       
          this.tmpnameMessage = '';       
      }
    }  
     //item validation
     if (this.TemplateItems.length==0) {
      this.errorCount++;
      this.itmnameMessage = 'Please select item';
    } else {       
          this.itmnameMessage = '';            
    }   

    if (this.errorCount == 0) {
     
      this.adminId = localStorage.getItem('userId');
      this.templateService.template.id = this.adminId;
      this.templateService.template.adminId = this.adminId;
      this.templateService.template.tmpTitle = this.tmpTitle;      
      this.templateService.template.tmpIsActive = this.tmpIsActive;
      this.templateService.template.tmpIsDelete = false;
      this.templateService.template.itemId=this.TemplateItems;
      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start template create service
        this.templateService.createTemplate().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.templateService.template.tmpTitle = '';
            this.router.navigate([environment.templateList]);
          }
        });
      }
    }
  }
  
}
