import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-uploadcontrolconcomponent',
  templateUrl: './uploadcontrolconcomponent.component.html',
  styleUrls: ['./uploadcontrolconcomponent.component.css']
})
export class UploadcontrolconcomponentComponent {

  selectedFiles?: FileList;
  @Input() inputModel: any;
  fileError=0;
  @Input() type="";
  @Input() class="";
  @Input() placeholder="";
  @Input() uploadicon="";
  @Input() recommendedsize="";
  @Output() inputModelChange = new EventEmitter<string>(); 
  @Output() selectedimage = new EventEmitter<any>();
  @Input() uploaderrmsg="";
  @Input() dropzonnew="";
  @Input() selectedimg="";
  
  
  @Input() selimg ="";
  @Input() imgDiv=false;
  @Input() imgshow=false;
  @Input() imgoverlay=true;
 constructor(){
  
 }
  ngOnInit(): void {
    
  }
   //file event
   selectFile($event:any){  
    this.imgDiv=true;
    //console.log("image",$event.target.files);
    this.selectedFiles = $event.target.files;
    let fileList: FileList = $event.target.files;
    if (fileList.length > 0) {
      const file:File = fileList[0];
      //this.handleInputChange(file);
      for (let i = 0; i < fileList.length; i++){
        this.handleInputChange(fileList[i]);
      }
    }

  } 
  clear(){    
    this.inputModel=null;    
  }
  //uploda file
  handleInputChange(files:any) {
    
    var file = files;    
   // var pattern = /image-*,.pdf/;
   var pattern = /image\/.*|application\/pdf|video\/mp4/
   //video/mp4
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      this.fileError++;
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e:any) {
    
    let reader = e.target;      
    //var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    var base64result = reader.result;
    
    //this.selectedimage.emit("data:image/jpg;base64,"+ base64result +"||");
    this.selectedimage.emit(base64result +"||");
  }
}
