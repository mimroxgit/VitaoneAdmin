export class  SiteSettings{
  id='';
  practitionerId:any;
  psdTitle:any;
  psdEmail:any;
  psdContact:any;
  psdLogo:any;
  psdDesc:any;
}

export class  SiteBanner{
    id='';
    practitionerId:any;  
    pbmImage:any; 
    pbmTitle:any;
    pbmSubTitle:any;
    pbmButtonText:any;
    pbmButtonLink:any;
    pbmIsButton:any;
    pbmAlignment:any;
    pbmType :any;
    pbmSeqNo:any;
    pbmBannerType:any;
    pbmVideoUrl:any
  }
  
  export class SocialMedia{
    id = '';
    practitionerId:any;
    psmPlatform:any;
    psmLink:any;
    psmIsActive:any;  
  }