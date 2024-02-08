import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Webpages } from '../models/webpages.model';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class WebpagesService {

  constructor(private http: HttpClient) {}

    //add model
    web: Webpages = new Webpages();

   //get  webpages details api with  SellerId
   getwebpagesdetails(id: any) {

    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });

    return this.http.get(`${baseURL + 'AdminDynamicWebPage/GetData?id='}${id}`, {
      headers: httpheaders,
    });
  }
  
   //post webpagesdetails api
   webpagesdetailsupdate() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });    
    return this.http.post(baseURL + 'AdminDynamicWebPage/SaveData', this.web, {
      headers: httpheaders,
    });
  }
}
