import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggleswitchcontrol',
  templateUrl: './toggleswitchcontrol.component.html',
  styleUrls: ['./toggleswitchcontrol.component.css']
})
export class ToggleswitchcontrolComponent {

  @Input() inputModel:any;
  @Output() inputModelChange = new EventEmitter<string>();
  @Input() lablActive="Active"
  
  checkActive($event:any){
    this.inputModelChange.emit(this.inputModel);
    if($event.target.checked==true){
      
      this.inputModel=true;
      
    }
    else{
      
      this.inputModel=false;
      
    }
    
  }
}
