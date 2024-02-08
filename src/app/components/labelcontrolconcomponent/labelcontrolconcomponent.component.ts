import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-labelcontrolconcomponent',
  templateUrl: './labelcontrolconcomponent.component.html',
  styleUrls: ['./labelcontrolconcomponent.component.css']
})
export class LabelcontrolconcomponentComponent {

  @Input() label="";
  @Input() class="";
  @Input() star=false;
  @Input() recommendedsize="";
}
