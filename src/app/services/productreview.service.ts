import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Productreview } from '../models/productreview.model';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductreviewService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  prdreview: Productreview = new Productreview();

   
 //get Active Productreview list in dropdown
 listprdreview() {
   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
  
   return this.http.get(`${baseURL + 'AdminProductReview/List'}`, {
     headers: httpheaders,
   })
 }  
 
 

 //post Productreview api
 createprdreview() {
  
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  return this.http.post(baseURL + 'AdminProductReview/Create', this.prdreview, {headers: httpheaders,});
 }

  //get  Product Review detail api with Id
  getDetail(id: any) {

    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
 
    return this.http.get(`${baseURL + 'AdminProductReview/GetDetails?id='}${id}`, {
      headers: httpheaders,
    });
  }
  
   //edit Product Review api with Id
   editProductReview() {
 
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    
    return this.http.post(baseURL + 'AdminProductReview/Update', this.prdreview, {
      headers: httpheaders,
    });
  }
 

 //delete review Display api with Id
 reviewDisplay(id: any) {
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  this.prdreview.id = id
  return this.http.post(baseURL + 'AdminProductReview/ChangeDisplay?Id=', this.prdreview, {
    headers: httpheaders,
  }).pipe(
   catchError(this.errorHandler)   
 )   
}

 

 //delete Productreview api with Id
 deleteprdreview(id: any) {
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': '*',
     'Access-Control-Allow-Headers':
       "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   this.prdreview.id = id
   return this.http.post(baseURL + 'AdminProductReview/Delete?Id=', this.prdreview, {
     headers: httpheaders,
   }).pipe(
    catchError(this.errorHandler)
    //console.log("err",error)
  )   
 }
 
 errorHandler(error:any) {
      
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;    
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;    
   if(error.status == 0){
    
    localStorage.clear();
    window.location.reload()
    this.router.navigate([environment.login]);
   }
  }
  return throwError(errorMessage);
}
}

