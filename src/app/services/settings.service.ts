import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { SiteBanner, SiteSettings, SocialMedia } from '../models/settings.model';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) {}

  //add model 
  siteinfo         : SiteSettings    = new SiteSettings();
  siteBanner       : SiteBanner      = new SiteBanner();
  ssminfo          : SocialMedia     = new SocialMedia();

  
/*********************************** Site Settings ********************************* */
  //get Site Settings
  getsitesettings() {

    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });

    return this.http.get(`${baseURL + 'AdminAccount/GetSiteSetting'}`, {
      headers: httpheaders,
    });
  }
  
   //post Site Settings api
   sitesettingupdate() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });    
    return this.http.post(baseURL + 'AdminAccount/SaveSiteSetting', this.siteinfo, {
      headers: httpheaders,
    });
  }

/*********************************** Site Banner  ********************************* */

//get Site Banner
getsiteBanner(id: any) {
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });

  return this.http.get(`${baseURL + 'AdminAccount/BannerList?id='}${id}`, {
    headers: httpheaders,
  });
}

//create Site Banner
siteBannercreate() {
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });        
  return this.http.post(baseURL + 'AdminAccount/AddBanner', this.siteBanner, {
    headers: httpheaders,
  });
}

//delete Site Banner
siteBannerdelete(id: any) {
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  this.siteBanner.id =id
  return this.http.post(baseURL + 'AdminAccount/DeleteBanner?Id=',this.siteBanner, {
    headers: httpheaders,
  });
}

/*********************************** Social Media Platform  ********************************* */
//get Social Media Platform
getsocialmedia(id: any) {
  
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  return this.http.get(`${baseURL + 'AdminAccount/GetSocialMediaList?id='}${id}`, {
    headers: httpheaders,
  });
}

//get social media platform dropdown 
getsmpdropdown() {

  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  return this.http.get(`${baseURL + 'AdminAccount/GetSocialMediaPlatform'}`, {
    headers: httpheaders,
  });
}

//create social media platform information  api
ssmcreate() {
  
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  return this.http.post(baseURL + 'AdminAccount/AddSocialMedia', this.ssminfo, {
    headers: httpheaders,
  });
}

//edit get social media platform information  api with Id
ssmgetedit(id: any) {
  
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  
  return this.http.get(`${baseURL + 'AdminAccount/GetSocialMediaData?id='}${id}`, {
    headers: httpheaders,
  });
}

//delete social media platform api with Id
socialmediadelete(id: any) {
  
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  this.ssminfo.id =id
  return this.http.post(baseURL + 'AdminAccount/DeleteSocialMedia?Id=',this.ssminfo, {
    headers: httpheaders,
  });
}
}
