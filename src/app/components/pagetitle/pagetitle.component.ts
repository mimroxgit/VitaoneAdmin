import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagetitle',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.css']
})
export class PagetitleComponent {

  @Input() pagetitle="";
  @Input() count=0;
  @Input() counts=false;
}
