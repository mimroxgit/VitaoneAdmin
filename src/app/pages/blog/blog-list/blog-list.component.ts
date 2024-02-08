import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {

  searchString1 :any 
  blogcreateurl="/"+environment.blogCreate
  imgeUrl = environment.cdnUrl + 'Blog';

  bloglist:any
  bloglistloading:any
  isdel = false;  

  constructor(
    public blogServiceService: BlogService,   
    private router : Router){ 
      this.Bloglist()         
  }

  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

   //get the list from blog
   private Bloglist() {
    this.bloglist = null;
    this.bloglistloading = true;
    this.blogServiceService.listActblog().subscribe({
      next: (data: any) => {                      
        this.bloglist = data;        
        this.bloglistloading = false;
      },
    });
  }

  Item:any;
  //set modele data (Id and field dispaly name)
  setModalpopup(item:any){    
    this.Item=item;
  }

  //delete the blog data 
  deletecnt(item: any) {
    this.blogServiceService.deleteBlog(item.id).subscribe({
      next: (res) => {   
        this.Bloglist();      
        this.isdel = false;
      },      
    });
  }

  
  //Edit for blog click
  edit(item:any){
    this.router.navigate([environment.blogEdit+"/"+item.id]);
  }

  

}
