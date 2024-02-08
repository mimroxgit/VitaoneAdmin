import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent {

  bloglistUrl = "/" + environment.blogList
  imgeUrl = environment.cdnUrl + 'Blog/';

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
  blmIsDisplay:any;
  blmIsApproved:any
  blgPhotoUrl: any;
  Id: any;

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
    private router: Router,
    private route: ActivatedRoute
  ) {   
    this.getcat(this.route.snapshot.params['id']);
   
  }

  // get the record blog
  getcat(id: any) {
    this.Id = id;
    this.loading = true
    this.blogService.getDetail(id).subscribe({
      next: (data: any) => {                          
        this.blmTitle = data.blmTitle                     
        this.blgPhotoUrl =  this.imgeUrl+ data.blmBanner
        this.blmDescription = data.blmDescription
       
        this.blmIsDisplay = data.blmIsDisplay
        this.blmIsApproved = data.blmIsApproved
        this.practitionerId = data.practitionerId
        this.blmWrittenBy =  data.blmWrittenBy
         this.loading = false
      },
     
    });
  }

   //select file event itmImageGallery
   selectedfile(pimImages: string) {    
    const itemimg = pimImages.split("||");
    this.blmBanner = pimImages    
    this.blgPhotoUrl = itemimg[0];
  }

   //Is read 
   isBestseller(event:any){
    if(event.target.checked == true){
      this.blmIsApproved = true
    }else{
      this.blmIsApproved =false 
    }    
  }

  //approved
  isapproved(event:any){
    if(event.target.checked == true){
      this.blmIsDisplay = true
    }else{
      this.blmIsDisplay =false 
    }    
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
    
    if (this.blgPhotoUrl == '-' ) {
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
      this.blogService.blog.id = this.Id;   
      this.blogService.blog.blmTitle = this.blmTitle; 
      this.blogService.blog.blmDescription = this.blmDescription;                  
      this.blogService.blog.practitionerId = this.practitionerId;
      this.blogService.blog.blmWrittenBy = this.blmWrittenBy;
      this.blogService.blog.blmBanner = this.blmBanner;
      this.blogService.blog.blmIsApproved = this.blmIsApproved;
      this.blogService.blog.blmIsDisplay = this.blmIsDisplay;

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start blog create service
        this.blogService.editBlog().subscribe((res:any) => {
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
