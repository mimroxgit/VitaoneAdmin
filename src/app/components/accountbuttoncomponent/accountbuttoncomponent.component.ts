import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accountbuttoncomponent',
  templateUrl: './accountbuttoncomponent.component.html',
  styleUrls: ['./accountbuttoncomponent.component.css']
})
export class AccountbuttoncomponentComponent {

  @Input() stylebtn="";
  @Input() loginbtnname="";
  @Input() buttondisable = false;
}
