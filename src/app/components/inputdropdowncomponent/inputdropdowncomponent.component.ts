import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-inputdropdowncomponent',
  templateUrl: './inputdropdowncomponent.component.html',
  styleUrls: ['./inputdropdowncomponent.component.css']
})
export class InputdropdowncomponentComponent {

  @Input() DDerrmsg="";
  @Input() selectstyle="";
  @Input() inptclass="";
  @Input() lblname="";
  @Input() type="";
  @Input() inputstyle="";
  @Input() placeholder="";
  @Input() value="";

  @Input() inputModel: any; 
  @Input() Unitlist =[]
  @Input() filedName :any;
  @Input() fieldId :any;
  @Input() unitId="-";
  @Input() setValue = "Unit";  
  @Output() inputModelChange = new EventEmitter<string>();
  @Output() idChange = new EventEmitter<string>();


  //ValueChange on select
  valuechange(item:any,id:any){
    
    this.setValue = item;    
    this.idChange.emit(id) 

      
  }

  //tetxChange
  textChange(){
    this.inputModelChange.emit(this.inputModel);        
  } 
}
