import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from 'src/app/services/settings.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  //accountdetails
  accountdetails: any;
  id: any;   
  email = '';
  name: any;
  contact: any;
  password: any;
  siteUrl:any;
 
  errorCount = 0;
  getacloading=true;
  acloading = false;
 
  nameMessage: any;
  emailMessage: any;   
  mobileMessage:any;
  passwordMessage: any;
 
  mes: any;
  response: any;

  //Site settings
  ImagePath = environment.cdnUrl + 'Store/Logo/';
  sitesettinglist:any;
  practitionerId:any;
  psdTitle:any;
  psdEmail:any;
  psdContact:any;
  psdLogo:any;
  psdDesc:any;  
  siteimageUrl:any;

  siteloading = false;
  getsiteloading = true;
  sitemes:any;  
  psdtitleMessage:any;
  psdemailMessage:any;
  psdcontactMessage:any;
  psdshortdecMessage:any;

  //Site Banner
  imgtrue = true
  imgeUrl = environment.cdnUrl + 'Store/Banner/'; 
  siteBannerlist:any;
  pbmtitleMessage:any;
  pbmSubtitleMessage:any;
  bannerImageMessage:any;
  siteBannermes:any;
  siteBannerloading = false;
  getsiteBannerloading = true;
  pbmImage:any
  pbmTitle:any;
  pbmSubTitle:any;
  pbmButtonText:any;
  pbmButtonLink:any;
  pbmIsButton=false;
  pbmTypedropdown:any=[{"Name":"Web"},{"Name":"Mobile"}];
  pbmType:any;
  pbmSeqNo:any;
  pbmAlignment:any;
  bannerId="-";
  sitebannerimageUrl:any;
  imgDiv:any;
  bannerdropdown:any = [{"Name":"Left"},{"Name":"Right"},{"Name":"Center"}];
  BVdropdown:any = [{"Name":"Banner"},{"Name":"Video"}];
  pbmBannerType="Banner";
  pbmVideoUrl:any


  //social media
  smpdropdown:any
  socialmedialist:any;
  Id:any
  psmPlatform:any;
  psmLink:any;
  psmlink:any
  socialdownMessage:any;
  linkMessage:any;
  psmIsActive:any;  
  socialoading = false;
  getsocialoading = true;
  platformName="";
  platformId="-";
  socialmes:any
  

  constructor(
    private toastr:ToastrService,    
    public siteservice:SettingsService,
    public siteBannerservice:SettingsService, 
    public socialmediaservice:SettingsService,
    public router: Router,
    private route: ActivatedRoute
  ) {    
    this.sitesettinginfo();
    this.siteBannerinfo();
    this.socialmediainfo();
    this.dropdownsmp();
  }

  /* Delete Platform */
  deletePlatform(item:any){     
    this.platformName=item.psmPlatform;
    this.platformId=item.id;
  }

  /* Delete Site Bannner */
  deleteSiteBanner(item:any){      
    this.bannerId=item.id;
  }

  //select SiteBanner file event
  bannerfile(bannerLogo: string) {
    this.imgtrue=true
    const webimg = bannerLogo.split("||"); 
    this.sitebannerimageUrl = webimg[0];
    this.siteservice.siteBanner.pbmImage = webimg[0];
    
  }

  /*dropdown*/
  platformDD(event:any){
    this.psmPlatform=event.target.value;
  }

  //select file event
  selectedfile(sssmLogo: string) {
    const webimg = sssmLogo.split("||"); 
    this.siteimageUrl = webimg[0];
    this.siteservice.siteinfo.psdLogo = webimg[0]
    
  }

  //select Video event
  selectedVideo(sssmLogo: string) {
    const webimg = sssmLogo.split("||");     
    this.pbmVideoUrl = webimg[0];
    //this.siteservice.siteBanner.pbmVideoUrl = webimg[0]
    
  }

   //check Email validation
   validateEmail(emailAddress: any) {
    var pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var res = pattern.test(emailAddress);
    return res;
  }

  //check Mobile validation
  validateMobile(mobileNo: any) {
    var pattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    var res = pattern.test(mobileNo);
    return res;
  }

  //check Number validation
  containsOnlyNumbers(str: any) {
    return /^\d+$/.test(str);
  }

  /*********************************** Site Settings ********************************* */

  /* get Site settings information */
  private sitesettinginfo() {
    
    this.sitesettinglist = null;
    this.getsiteloading = true;
    this.siteservice.getsitesettings().subscribe({
      next: (data) => {            
        if(data ==null){
          this.getsiteloading = false
        }    
        this.sitesettinglist = data;
        this.psdTitle = this.sitesettinglist.psdTitle,
        this.psdEmail = this.sitesettinglist.psdEmail,
        this.psdContact = this.sitesettinglist.psdContact,
        this.psdDesc = this.sitesettinglist.psdDesc,
        this.siteimageUrl = this.ImagePath + this.sitesettinglist.psdLogo,
        this.getsiteloading = false;
      },      
    });
  }

  //post for Site settings Update
  onSitesetting(form: NgForm) {
    this.errorCount = 0;
   
    //title validation
    if (this.psdTitle == undefined) {
      this.errorCount++;
      this.psdtitleMessage = 'Please enter title';
    } else {
      if (this.psdTitle.trim() == '') {
        this.errorCount++;
        this.psdtitleMessage = 'Please enter title';
      } else {
        this.psdtitleMessage = '';
      }
    }
    
    //Email Validation
    if (this.psdEmail == undefined) {
      this.errorCount++;
      this.psdemailMessage = 'Please enter email';
    } else {
      if (this.psdEmail.trim() == '') {
        this.errorCount++;
        this.psdemailMessage = 'Please enter valid email';
      } else {
        var validateEmail = this.validateEmail(this.psdEmail);
        if (validateEmail == false) {
          this.errorCount++;
          this.psdemailMessage = 'Please enter valid email';
        } else {
          this.psdemailMessage = '';
        }
      }
    }

    //Mobile Validation
    if (this.psdContact == undefined) {
      this.errorCount++;
      this.psdcontactMessage = 'Please enter contact number';
    } else {
      if (this.psdContact.trim() == '') {
        this.errorCount++;
        this.psdcontactMessage = 'Please enter valid contact number';
      } else {
        var isNumber = this.containsOnlyNumbers(this.psdContact);
        if (isNumber == true) {
          var validateMobile = this.validateMobile(this.psdContact);
          if (validateMobile == false) {
            this.errorCount++;
            this.psdcontactMessage = 'Please enter valid contact number';
          } else {
            this.psdcontactMessage = '';
          }
        } else {
          this.psdcontactMessage = '';
        }
      }
    }    

    //description validation
    if (this.psdDesc == undefined) {
      this.errorCount++;
      this.psdshortdecMessage = 'Please enter short description';
    } else {
      if (this.psdDesc.trim() == '') {
        this.errorCount++;
        this.psdshortdecMessage = 'Please enter short description';
      } else {
        this.psdshortdecMessage = '';
      }
    }

    if (this.errorCount == 0) {
      this.practitionerId = localStorage.getItem('userId');

      this.siteservice.siteinfo.practitionerId = localStorage.getItem('userId');
      this.siteservice.siteinfo.psdTitle = this.psdTitle;      
      this.siteservice.siteinfo.psdEmail = this.psdEmail;
      this.siteservice.siteinfo.psdContact = this.psdContact;
      this.siteservice.siteinfo.psdDesc = this.psdDesc;   
      //this.siteservice.siteinfo.psdLogo = this.siteimageUrl;
      

      //loading condition start
      if (this.siteloading == false) {
        this.siteloading = true;

        //start site settings update service
        this.siteservice.sitesettingupdate().subscribe(
          (res: any) => {
            this.response = res;            
            if (this.response != 'Success') {
              this.sitemes = this.response;
              this.siteloading = false;
            } else {
              this.siteloading = false;             
              this.toastr.success("Site details saved successfully !")
              this.router.navigate([environment.settings]);
            }
          });
      }
    }
  }





/*********************************** Site Banner  ********************************* */
   
  isbannerButton(event:any){
  if(event.target.checked == true){
    this.pbmIsButton = true
  }else{
    this.pbmIsButton =false 
  }     
  }
 

 
  /*dropdown*/
  bannerDD(event:any){
    this.pbmAlignment=event.target.value;
  }

  isVideoHide=false
  /*dropdown*/
  banVedDD(event:any){
    
    this.pbmBannerType=event.target.value;
    if(this.pbmBannerType == "Video"){
      this.isVideoHide = true
    }else{
      this.isVideoHide = false
    }
    
  }

  /*dropdown*/
  typeDD(event:any){
    this.pbmType=event.target.value;
  }

  /* get Site Banner */
  private siteBannerinfo() {
    this.practitionerId = localStorage.getItem('userId');   
    this.siteBannerlist = null;
    this.getsiteBannerloading = true;
    this.siteBannerservice.getsiteBanner(this.practitionerId).subscribe({
      next: (data) => {                              
        this.siteBannerlist = data;     
        this.getsiteBannerloading = false;
      },      
    });
  }   
  bannerVideoMessage:any
  sitebannervideoUrl:any
  
  /*post Site Banner create */
   onSiteBanner(form: NgForm) {

    this.errorCount = 0;   
         if(this.pbmBannerType=="Banner")
         {
             //Image validation
              if (this.sitebannerimageUrl == undefined) {
                this.errorCount++;
                this.bannerImageMessage = 'Please select image';
              } else {
                this.bannerImageMessage = '';
              }
         }
         if(this.pbmBannerType=="Video")
         {
             //Image validation
              if (this.pbmVideoUrl == undefined) {
                this.errorCount++;
                this.bannerVideoMessage = 'Please select Video';
              } else {
                this.bannerVideoMessage = '';
              }
         }
    

    if (this.errorCount == 0) {
      this.practitionerId = localStorage.getItem('userId');

      this.siteBannerservice.siteBanner.practitionerId = localStorage.getItem('userId');
      if(this.pbmTitle == undefined){
        this.siteBannerservice.siteBanner.pbmTitle = "-"
      }else{
        this.siteBannerservice.siteBanner.pbmTitle = this.pbmTitle
      }
      if(this.pbmSubTitle == undefined){
        this.siteBannerservice.siteBanner.pbmSubTitle = "-"
      }else{
        this.siteBannerservice.siteBanner.pbmSubTitle = this.pbmSubTitle
      }
      
      if(this.pbmAlignment == undefined){      
        this.siteBannerservice.siteBanner.pbmAlignment = 'Left'
      }else{
        this.siteBannerservice.siteBanner.pbmAlignment = this.pbmAlignment  
      }
      if(this.pbmType == undefined){      
        this.siteBannerservice.siteBanner.pbmType = 'Web'
      }else{
        this.siteBannerservice.siteBanner.pbmType = this.pbmType  
      }
      this.siteBannerservice.siteBanner.pbmIsButton = this.pbmIsButton
      if(this.pbmButtonText == undefined){
        this.siteBannerservice.siteBanner.pbmButtonText = "-"
      }else{
        this.siteBannerservice.siteBanner.pbmButtonText = this.pbmButtonText
      }
      if(this.pbmButtonLink == undefined){
        this.siteBannerservice.siteBanner.pbmButtonLink = "-"
      }else{
        this.siteBannerservice.siteBanner.pbmButtonLink = this.pbmButtonLink
      }
      this.siteBannerservice.siteBanner.pbmSeqNo = this.pbmSeqNo

     
      if(this.pbmVideoUrl== undefined){
        this.siteBannerservice.siteBanner.pbmVideoUrl = "-"  
      }else{
        this.siteBannerservice.siteBanner.pbmVideoUrl = this.pbmVideoUrl
      }

      if(this,this.pbmBannerType == undefined){
        this.siteBannerservice.siteBanner.pbmBannerType = "Banner";
      }else{
        this.siteBannerservice.siteBanner.pbmBannerType = this.pbmBannerType;
      }

      
      //this.siteBannerservice.siteBanner.pbmImage = this.pbmImage,      
      

      //loading condition start
      if (this.siteBannerloading == false) {
        this.siteBannerloading = true;

        //start Site Banner create service
        this.siteBannerservice.siteBannercreate().subscribe((res: any) => {          
          this.response = res;

            
            if (this.response != 'Success') {
              this.siteBannermes = this.response;
              this.siteBannerloading = false;
            } else {
              this.siteBannerloading = false;
             
              this.toastr.success("site banner upload successfully !")              
              
              this.siteBannerinfo();
              this.sitebannerimageUrl=" ";
              this.sitebannervideoUrl="";
              this.pbmTitle = " ";
              this.pbmSubTitle = " ";
              this.pbmButtonText = " ";
              this.pbmButtonLink = " ";
              this.pbmSeqNo = " ";
              this.pbmIsButton = false
              this.imgtrue=false
              //this.router.navigate([environment.settings]);
            }
          });
      }
    }

  }

   //delete the data particular Site Banner
   deletebanner() {     
    var id =this.bannerId    
    this.siteBannerservice.siteBannerdelete(id).subscribe({
      next: (res) => {
        this.siteBannerinfo();        
      },     
    });
  }

  

/*********************************** Social Media Platform  ********************************* */

  /* get dropdown social media platform */
  private dropdownsmp() {        
    this.socialmediaservice.getsmpdropdown().subscribe({
      next: (data) => {        
        this.smpdropdown = data;             
      },      
    });
  }

  /* get social media platform */
  private socialmediainfo() {
    this.practitionerId = localStorage.getItem('userId');   
    this.socialmedialist = null;
    this.getsocialoading = true
    this.socialmediaservice.getsocialmedia(this.practitionerId).subscribe({
      next: (data) => {
        this.socialmedialist = data;
        this.getsocialoading = false
      },      
    });
  }   

  
  /*post social media platform information create */
  onSocialmp(form: NgForm) {
    this.errorCount = 0;   

     //dropdown validation
    //  if (this.catalogueId == '-') {
    //   this.errorCount++;
    //   this.socialdownMessage = 'Please select platform';
    // } else {
    //   this.socialdownMessage = '';
    // }

     //title validation
     if (this.psmLink == undefined) {
      this.errorCount++;
      this.linkMessage = 'Please enter link';
    } else {
      if (this.psmLink.trim() == '') {
        this.errorCount++;
        this.linkMessage = 'Please enter link';
      } else {
        this.linkMessage = '';
      }
    }
    if (this.errorCount == 0) {
      this.practitionerId = localStorage.getItem('userId');

      this.socialmediaservice.ssminfo.practitionerId = localStorage.getItem('userId');
      this.socialmediaservice.ssminfo.psmPlatform = this.psmPlatform,      
      this.socialmediaservice.ssminfo.psmLink = this.psmLink,            
      this.socialmediaservice.ssminfo.psmIsActive = this.psmIsActive;

      //loading condition start
      if (this.socialoading == false) {
        this.socialoading = true;

        //startsocial media platform create service
        this.socialmediaservice.ssmcreate().subscribe((res: any) => {
            this.response = res;
           
            if (this.response != 'Success') {
              this.socialmes = this.response;
              this.socialoading = false;
            } else {
              this.socialoading = false;
              this.toastr.success("social media saved successfully !")
              this.psmLink = '';
              this.socialmediainfo();
              //this.router.navigate([environment.settings]);
            }
          });
      }
    }
  } 
  
  //delete the data particular social media platform information
  deletessm() {       
    var id =this.platformId      
    this.socialmediaservice.socialmediadelete(id).subscribe({
      next: (res) => {
        this.socialmediainfo();        
      },
     // error: (e) => console.error(e),
    });
  }


}
