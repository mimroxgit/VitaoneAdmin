import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-divcomponent',
  templateUrl: './divcomponent.component.html',
  styleUrls: ['./divcomponent.component.css']
})
export class DivcomponentComponent {


  @Input() displayhead:any[] = [];
  @Input() tableData : any[] = [];
  @Input() tableList : string[] = [];
  @Input() statusdisplayname: any='';
  @Input() Modaldisplayname : any="";
  @Input() object : any;
  @Input() objectfield : any;
  

  /******************** */

  @Input() searchString = '';
  @Input() loderarry:any[] = [{name:1},{name:2}]  
  @Input() catname="";
  @Input() isloder : any;
  @Input() imagepath:any;
  @Input() item:any[] = [];
  @Input() isedit : boolean=true;
  @Output() onedit=new EventEmitter<any>();
  @Output() ondetail=new EventEmitter<any>();
  @Input() isdelete : boolean=true;
  @Output() ondelete=new EventEmitter<any>();
  Item:any;
  
  //scroll
  @Output() onscroll=new EventEmitter<any>();
  post:any=[];

  scroll(){
    this.onscroll.emit();
  }
  
  //on edit pass data from ts
  edit(item:any){
    this.onedit.emit(item);
  }

  //on detail pass data from ts
  detail(item:any){
    this.ondetail.emit(item);
  }

  //on delete pass data from ts
  delete(item:any){
    this.ondelete.emit(item);
  }

  //set modele data (Id and field dispaly name)
  setModalpopup(item:any){  
    this.Item=item;
  }

}
