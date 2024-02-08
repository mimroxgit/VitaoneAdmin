import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-inputcontrol',
  templateUrl: './inputcontrol.component.html',
  styleUrls: ['./inputcontrol.component.css']
})
export class InputcontrolComponent {

  @Input() lblname="";
  @Input() type="";
  @Input() placeholder="";
  @Input() inptclass="";
  @Input() inputstyle="";
  @Input() value="";
  @Input() minValue="";
  @Input() maxValue="";
  @Input() inputModel: any; 
  @Output() inputModelChange = new EventEmitter<string>();
  @Input() errmsg="";
  @Input() star=true;
  @Input() newlbl="";

  textChange(){  
    this.inputModelChange.emit(this.inputModel);  
   
  }  
}
