import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { State } from '../models/state.model';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  state: State = new State();  

 //get State list
 listState() {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   
   return this.http.get(`${baseURL + 'AdminState/List'}`, {
     headers: httpheaders,
   }).pipe(
    catchError(this.errorHandler)
    //console.log("err",error)
  )   
 }
 
 //get Active State list
 listActiveState() {

  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  
  return this.http.get(`${baseURL + 'AdminState/ActiveList'}`, {
    headers: httpheaders,
  });
}

 //post State api
 createState() {
   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });   
   return this.http.post(baseURL + 'AdminState/Create', this.state, {
     headers: httpheaders,
   });
 }

  //get  State api with Id
  getState(id: any) {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });

   return this.http.get(`${baseURL + 'AdminState/Details?id='}${id}`, {
     headers: httpheaders,
   });
 }

 //edit State api with Id
 editState() {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   
   return this.http.post(baseURL + 'AdminState/Edit', this.state, {
     headers: httpheaders,
   });
 }

  //delete State api with Id
  deleteState(id: any) {
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': '*',
     'Access-Control-Allow-Headers':
       "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   this.state.id = id
   return this.http.post(baseURL + 'AdminState/Delete?Id=', this.state, {
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
