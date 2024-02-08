import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-textareacontrolcontrolcomponent',
  templateUrl: './textareacontrolcontrolcomponent.component.html',
  styleUrls: ['./textareacontrolcontrolcomponent.component.css']
})
export class TextareacontrolcontrolcomponentComponent {

  @Input() type="";
  @Input() class="";
  @Input() placeholder="";
  @Input() value="";
  @Input() grid="";
  @Input() inputModel: any; 
  @Input() areaerrmsg="";
  @Output() inputModelChange = new EventEmitter<string>();

  textChange(){  
    this.inputModelChange.emit(this.inputModel);  
   
  }  
}
