import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Module, ModuleLesson } from '../models/module.model';
import { Router } from '@angular/router';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  mdl: Module = new Module();
  mdlsn: ModuleLesson = new ModuleLesson();

  //get  module list in dropdown
  Actlistmodule() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminModule/ActiveList'}`, {
      headers: httpheaders,
    })
  }  

  //get Assigned lesson list 
  Assignedlistlesson(id:any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminModule/GetLessonByModule?id='}${id}`, {    
      headers: httpheaders,
    })
  }

   
 //get  module list in dropdown
 listmodule() {
   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
  
   return this.http.get(`${baseURL + 'AdminModule/List'}`, {
     headers: httpheaders,
   })
 }  
 
 
 //post Module api
 createModule() {
  
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  return this.http.post(baseURL + 'AdminModule/Create', this.mdl, {headers: httpheaders,});
 }

 //get  Module detail api with Id
 getDetail(id: any) {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });

   return this.http.get(`${baseURL + 'AdminModule/Details?id='}${id}`, {
     headers: httpheaders,
   });
 }
 
  //edit Module api with Id
  editModule() {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   
   return this.http.post(baseURL + 'AdminModule/Edit', this.mdl, {
     headers: httpheaders,
   });
 }

 //delete Module api with Id
 deleteModule(id: any) {
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': '*',
     'Access-Control-Allow-Headers':
       "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   this.mdl.id = id
   return this.http.post(baseURL + 'AdminModule/Delete?Id=', this.mdl, {
     headers: httpheaders,
   }).pipe(
    catchError(this.errorHandler)
    //console.log("err",error)
  )   
 }
 /**********************lesson assing in module****************************** */
 //post lesson assing in module
 createlsnAssing() {
  
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  return this.http.post(baseURL + 'AdminModule/AssigeLesson', this.mdlsn, {headers: httpheaders,});
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
