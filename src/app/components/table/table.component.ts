import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  ImagePath = environment.cdnUrl + 'SubCategory/';
  @Input() searchString = '';
  @Input() sectiontitle="";
  @Input() isCreatebuttonshow = false;

  @Input() tableList : string[] = [];
  @Input() tableData : any[] = [];
  @Input() displayhead:any[] = [];
  @Input() image : any;
  @Input() object : any;
  @Input() objectfield : any;
  @Input() isaction : boolean=true;
  @Input() isedit : boolean=true;
  @Output() onedit=new EventEmitter<any>();
  @Input() isdetail : boolean=false;
  @Output() ondetail=new EventEmitter<any>();
  @Input() isdelete : boolean=true;
  @Output() ondelete=new EventEmitter<any>();
  Item:any;
  @Input() Modaldisplayname : any="";
  @Input() statusdisplayname: any='';
  @Input() defaultdisplayname: any='';
  @Input() Isshowdefault=false;
  @Input() isLoader=false;
   //scroll
   @Output() onscroll=new EventEmitter<any>();
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
