import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Practitionercategories } from '../models/practitionercategories.model';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PractitionercategoriesService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  pracat: Practitionercategories = new Practitionercategories();
  
   
 //get Active Practitioner categories list in dropdown
 listActpracategories() {
   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
  
   return this.http.get(`${baseURL + 'AdminPractitionerCategories/ActiveList'}`, {
     headers: httpheaders,
   })
 }  
 
 //get Practitioner Categories list 
 commenDataList(apiUrl:any) {
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  return this.http.get(apiUrl, {
    headers: httpheaders,
   }).pipe(
    catchError(this.errorHandler)
    //console.log("err",error)
  )   
 }

 //post Practitioner Categories api
 createpraCategories() {
  
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  return this.http.post(baseURL + 'AdminPractitionerCategories/Create', this.pracat, {headers: httpheaders,});
 }

 //get  Practitioner Categories detail api with Id
 getDetail(id: any) {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });

   return this.http.get(`${baseURL + 'AdminPractitionerCategories/Details?id='}${id}`, {
     headers: httpheaders,
   });
 }
 
  //edit Practitioner Categories api with Id
  editpraCategories() {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   
   return this.http.post(baseURL + 'AdminPractitionerCategories/Edit', this.pracat, {
     headers: httpheaders,
   });
 }

 //delete Practitioner Categories api with Id
 deletepraCategories(id: any) {
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': '*',
     'Access-Control-Allow-Headers':
       "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   this.pracat.id = id
   return this.http.post(baseURL + 'AdminPractitionerCategories/Delete?Id=', this.pracat, {
     headers: httpheaders,
   });    
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
