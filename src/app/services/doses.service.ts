import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Doses } from '../models/doses.model';


//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DosesService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  dose: Doses = new Doses();  

 //get Doses list
 listDoses() {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   
   return this.http.get(`${baseURL + 'AdminDose/List'}`, {
     headers: httpheaders,
   }).pipe(
    catchError(this.errorHandler)
    //console.log("err",error)
  )   
 }
 
 //get Active Doses list
 listActiveDoses() {

  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  
  return this.http.get(`${baseURL + 'AdminDose/ActiveList'}`, {
    headers: httpheaders,
  });
}

 //post Doses api
 createDoses() {
   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });   
   return this.http.post(baseURL + 'AdminDose/Create', this.dose, {
     headers: httpheaders,
   });
 }

  //get  Doses api with Id
  getDoses(id: any) {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });

   return this.http.get(`${baseURL + 'AdminDose/Details?id='}${id}`, {
     headers: httpheaders,
   });
 }

 //edit Doses api with Id
 editDoses() {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   
   return this.http.post(baseURL + 'AdminDose/Edit', this.dose, {
     headers: httpheaders,
   });
 }

  //delete Doses api with Id
  deleteDoses(id: any) {
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': '*',
     'Access-Control-Allow-Headers':
       "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   this.dose.id = id
   this.dose.adminId = localStorage.getItem('userId');
   return this.http.post(baseURL + 'AdminDose/Delete', this.dose, {
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
