import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-searchdropdownconcomponent',
  templateUrl: './searchdropdownconcomponent.component.html',
  styleUrls: ['./searchdropdownconcomponent.component.css']
})
export class SearchdropdownconcomponentComponent {

 formGroup!: FormGroup;
 @Input() filteredOptions: any;
 @Input() options = [''];
 @Output() selectedvalue=new EventEmitter<any>();
 @Input() defaultValue="-";
 @Input() fieldId ="-";
 @Input() filedName :any;
 @Input() dropdownTitile:any;
 @Input() exfrm="";
 @Input() isAll=true;
 name:any
  constructor(
    private http :HttpClient,    
    private fb:FormBuilder,)
    {}
 
  ngOnInit(): void {
      this.initform();     
  }

    //////////////////////
    initform(){
      this.formGroup = this.fb.group({
        'name':['']
      })
      this.formGroup.get('name')?.valueChanges.subscribe((response: any) => {
        
        this.filterData(response);
       
       

      })
    }


  filterData(enteredData:any){
   
    //find name by id
    const data:any=this.options.find(item => {
      return item[this.filedName].toLowerCase()==enteredData.toLowerCase()
    });
        
    //set id
    if(data!=undefined){
      this.name=data[this.fieldId]??'All';
      this.selectedvalue.emit(this.name);
    }
    
    this.filteredOptions = this.options.filter(item => {
      return item[this.filedName].toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }
  
  //get dropdown id onchange event
  onchange(item:any){  
    this.name = item
    this.selectedvalue.emit(this.name);       
  }

  //clear textbox value
  value = '';
  clear(){    
    this.value = ''
    this.selectedvalue.emit('All')
    this.name = 'All'
    this.filterData('All');
  }
  
 
}
