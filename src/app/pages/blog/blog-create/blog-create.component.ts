import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent {

  bloglistUrl = "/" + environment.blogList

  @Input() Isshowlabeluploadfile = true;
  @Input() Isshowfileupload = true;
  @Input() Isshowselectbox = true; 
  @Input() Isshowlabeleditor = true;
  @Input() Isshoweditor = true;


  practitionerId :any;
  blmTitle  : any;    
  blmBanner  :any;
  blmDescription :any;
  blmWrittenBy :any;
  blgPhotoUrl: any;

  loading = false;
  
    
  mes: any;
  response: any;
  nameMessage: any; 
  message: any; 
  blgImageMessage:any;
  errorCount = 0;

  constructor(
    
    //public practitionerService:PractitionersService,
    public blogService:BlogService,
    private router: Router
  ) {   
    //this.practitionerlistactive()
   // this.Itemlistactive()
  }


  //select file event itmImageGallery
  selectedfile(pimImages: string) {    
    const itemimg = pimImages.split("||");
    this.blmBanner = pimImages    
    this.blgPhotoUrl = itemimg[0];
  }

   //post for Product Review Create
   onSubmit(form: NgForm) {
    this.errorCount = 0;

    //Name validation
    if (this.blmTitle == undefined) {
      this.errorCount++;
      this.nameMessage = 'Please enter title';
    } else {
      if (this.blmTitle.trim() == '') {
        this.errorCount++;
        this.nameMessage = 'Please enter valid title';
      } else {       
          this.nameMessage = '';       
      }
    } 

    //Image validation
    
    if (this.blgPhotoUrl == undefined ) {
      this.errorCount++;      
      this.blgImageMessage = 'Please enter banner';
    } else {
      this.blgImageMessage = '';
    }
           

     //Message validation
     if (this.blmDescription == undefined) {
      this.errorCount++;
      this.message = 'Please enter description';
    } else {
      if (this.blmDescription.trim() == '') {
        this.errorCount++;
        this.message = 'Please enter valid description';
      } else {       
          this.message = '';       
      }
    } 

    if (this.errorCount == 0) {            
      this.blogService.blog.blmTitle = this.blmTitle; 
      this.blogService.blog.blmDescription = this.blmDescription;                  
      this.blogService.blog.practitionerId = "000000000000000000000000";                                      
      this.blogService.blog.blmWrittenBy = "Vitaone";
      this.blogService.blog.blmBanner = this.blmBanner;

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start blog create service
        this.blogService.createBlog().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.blogService.blog.blmTitle = '';
            this.router.navigate([environment.blogList]);
          }
        });
      }
    }
  }

}
