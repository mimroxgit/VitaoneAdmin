import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent {

  searchString1 :any 
  lessoncreateurl="/"+environment.lessonCreate
  lessonmoduleurl="/"+environment.lessonmodule

  lessonlist:any
  lessonlistloading:any
  isdel = false;  

  constructor(
    public lessonService: LessonService,   
    private router : Router){ 
     this.Lessonlist()         
  }

  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

  //get the list from Lesson
  private Lessonlist() {
    this.lessonlist = null;
    this.lessonlistloading = true;
    this.lessonService.listlesson().subscribe({
      next: (data: any) => {                             
        this.lessonlist = data;        
        this.lessonlistloading = false;
      },
    });
  }

  Item:any;
  //set lesson data (Id and field dispaly name)
  setModalpopup(item:any){    
    this.Item=item;
  }

  //delete the Lesson data 
  deletecnt(item: any) {
    this.lessonService.deleteLesson(item.id).subscribe({
      next: (res) => {   
        this.Lessonlist();      
        this.isdel = false;
      },      
    });
  }

  
  //Edit for Lesson click
  edit(item:any){
    this.router.navigate([environment.lessonEdit+"/"+item.id]);
  }


}
