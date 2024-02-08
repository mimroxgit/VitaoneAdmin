import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-categoryblock',
  templateUrl: './categoryblock.component.html',
  styleUrls: ['./categoryblock.component.css']
})
export class CategoryblockComponent {

  @Input() searchString = '';
  @Input() loderarry:any[] = [{name:1},{name:2},{name:3},{name:4},{name:5},{name:6},{name:7},{name:8},{name:9},{name:10},{name:11},{name:12}]  
  @Input() catname="";
  @Input() isloder : any;
  @Input() catalogue:any[] = []
  @Input() isedit : boolean=true;
  @Output() onedit=new EventEmitter<any>();
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

  //on delete pass data from ts
  delete(item:any){
    this.ondelete.emit(item);
  }
  
  //set modele data (Id and field dispaly name)
  setModalpopup(item:any){       
    this.Item=item;
  }
}
