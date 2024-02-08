import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Lesson } from '../models/lesson.model';
import { Router } from '@angular/router';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient,private router: Router) {}  

  //add model
  lsm: Lesson = new Lesson();

  //get Active lesson list
  Actlistlesson() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminLesson/ActiveList'}`, {
      headers: httpheaders,
    })
  }
  
  
 //get lesson list 
 listlesson() {
   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
  
   return this.http.get(`${baseURL + 'AdminLesson/List'}`, {
     headers: httpheaders,
   })
 }  
 
 
 //post Lesson api
 createLesson() {
  
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });  
  return this.http.post(baseURL + 'AdminLesson/Create', this.lsm, {headers: httpheaders,});

 }

 //get  Lesson detail api with Id
 getDetail(id: any) {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });

   return this.http.get(`${baseURL + 'AdminLesson/Details?id='}${id}`, {
     headers: httpheaders,
   });
 }
 
  //edit Lesson api with Id
  editLesson() {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });   
   return this.http.post(baseURL + 'AdminLesson/Edit', this.lsm, {
     headers: httpheaders,
   });
 }

 //delete Lesson api with Id
 deleteLesson(id: any) {
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': '*',
     'Access-Control-Allow-Headers':
       "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   this.lsm.id = id
   return this.http.post(baseURL + 'AdminLesson/Delete?Id=', this.lsm, {
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
