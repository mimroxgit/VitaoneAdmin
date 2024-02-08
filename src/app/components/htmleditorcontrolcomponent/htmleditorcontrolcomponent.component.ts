import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-htmleditorcontrolcomponent',
  templateUrl: './htmleditorcontrolcomponent.component.html',
  styleUrls: ['./htmleditorcontrolcomponent.component.css']
})
export class HtmleditorcontrolcomponentComponent {

  @Input() inputModel: any; 
  @Output() inputModelChange = new EventEmitter<string>();
  @Input() htmlerrmsg="";
 
  textChange(){  
    this.inputModelChange.emit(this.inputModel);  
   
  } 
  //@Input() htmlContent = '';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    sanitize: false,
    toolbarHiddenButtons: [
      ['']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  
}
