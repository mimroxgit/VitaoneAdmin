import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Template } from '../models/template.model';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  template: Template = new Template();  

 //get Template list
 listTemplate() {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   
   return this.http.get(`${baseURL + 'AdminTemplate/List'}`, {
     headers: httpheaders,
   }).pipe(
    catchError(this.errorHandler)
    //console.log("err",error)
  )   
 }
 
 //get Active Item list
 listActiveItem() {

  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  
  return this.http.get(`${baseURL + 'AdminItems/List2'}`, {
    headers: httpheaders,
  });
}
 
 //get Active Template list
 listActiveTemplate() {

  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  
  return this.http.get(`${baseURL + 'AdminTemplate/ActiveList'}`, {
    headers: httpheaders,
  });
}

 //post Template api
 createTemplate() {
   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });      
   return this.http.post(baseURL + 'AdminTemplate/Create', this.template, {
     headers: httpheaders,
   });
 }
 
  //get  Template api with Id
  getTemplate(id: any) {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });

   return this.http.get(`${baseURL + 'AdminTemplate/Details?id='}${id}`, {
     headers: httpheaders,
   });
 }

 //edit Template api with Id
 editTemplate() {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   
   return this.http.post(baseURL + 'AdminTemplate/Edit', this.template, {
     headers: httpheaders,
   });
 }

  //delete Template api with Id
  deleteTemplate(id: any) {
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': '*',
     'Access-Control-Allow-Headers':
       "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   this.template.id = id
   return this.http.post(baseURL + 'AdminTemplate/Delete?Id=', this.template, {
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
