import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buttoncontrolconcomponent',
  templateUrl: './buttoncontrolconcomponent.component.html',
  styleUrls: ['./buttoncontrolconcomponent.component.css']
})
export class ButtoncontrolconcomponentComponent {

  @Input() btnstyle="";
  @Input() btnname="";
  @Input() btndisable = false;
  
  
}
