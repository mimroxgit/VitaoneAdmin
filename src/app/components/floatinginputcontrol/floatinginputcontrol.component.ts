import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-floatinginputcontrol',
  templateUrl: './floatinginputcontrol.component.html',
  styleUrls: ['./floatinginputcontrol.component.css']
})
export class FloatinginputcontrolComponent {

  @Input() lblname="";
  @Input() type="";
  @Input() placeholder="";
  @Input() inptclass="";
  @Input() inputModel: any; 
  @Output() inputModelChange = new EventEmitter<string>();
  @Input() errmsg="";
  @Input() inputstyle="";

  textChange(){  
    this.inputModelChange.emit(this.inputModel);  
   
  }  
}
