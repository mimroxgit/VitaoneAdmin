import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.css']
})
export class TemplateEditComponent {

  templatelistUrl = "/" + environment.templateList

  Id: any;
  tmpTitle:any;
  tmpIsActive :any;
  adminId: any;  

  loading = false;
  mes: any;
  response: any;
  tmpnameMessage:any;
  itmnameMessage:any;
  errorCount = 0;
  TemplateItems:any=[];

  constructor(
    public templateService: TemplateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getTmp(this.route.snapshot.params['id']);
    
  }

  
  // get the record particular Template
  getTmp(id: any) {
    this.Id = id;
    this.loading = true
    this.templateService.getTemplate(id).subscribe({
      next: (data: any) => {             
        (this.tmpTitle = data.tmpTitle),  
        (this.tmpIsActive = data.tmpIsActive)
        this.itmlist()
        data.itemId.forEach((element:any) => {
          var item1={
            id:element.id,
            title:element.title,
            image :element.image
          }
          this.TemplateItems.push(item1);
        });
         this.loading = false

      },
      //error: (e) => console.log(e),
    });
  }

  itmId:any;
  Itemlist:any=[];
  Itemlistloading:any;  
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
          id:itm.id    ,  
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
      this.templateService.template.id = this.Id;
      this.templateService.template.adminId = this.adminId;
      this.templateService.template.tmpTitle = this.tmpTitle;      
      this.templateService.template.tmpIsActive = this.tmpIsActive;      
      this.templateService.template.itemId=this.TemplateItems;
      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start template create service
        this.templateService.editTemplate().subscribe((res:any) => {
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
