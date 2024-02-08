import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cataloguedropdowncontrolconcomponent',
  templateUrl: './cataloguedropdowncontrolconcomponent.component.html',
  styleUrls: ['./cataloguedropdowncontrolconcomponent.component.css']
})
export class CataloguedropdowncontrolconcomponentComponent {

  @Input()categories =[]
  @Input() filedName :any;
  @Input() fieldId :any;
  @Input() isSelected=true;
  @Input() dstar=true;

  @Output() selectedvalue=new EventEmitter<any>();
  @Input() inputModel=1;
  @Input() isdisplyAll = false
  @Input() class="";
  @Input() catId="-";
  @Input() Isactive = true;
  @Input() dropdowntitle ="";
  @Input() lblname="";
  @Input() DDerrmsg="";
  @Input() selectstyle="";
  defaultValue="-";



  //get dropdown id onchange event
    onchange(){    

    this.selectedvalue.emit(this.catId);
    
  }
}
