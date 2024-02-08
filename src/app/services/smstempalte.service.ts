import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Smstemplate } from '../models/smstemplate.model';
import { Router } from '@angular/router';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SmstempalteService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  smsModel: Smstemplate = new Smstemplate();

  //get State list
 listSmstemplate() {

  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  
  return this.http.get(`${baseURL + 'AdminSMSTemplate/List'}`, {
    headers: httpheaders,
  }).pipe(
   catchError(this.errorHandler)
   //console.log("err",error)
 )   
}

//get Active State list
listActiveSmstemplate() {

 //add httpheaders
 const httpheaders = new HttpHeaders({
   'Content-Type': 'application/json',
   'Access-Control-Allow-Origin': '*',
   Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
 });
 
 return this.http.get(`${baseURL + 'AdminSMSTemplate/ActiveList'}`, {
   headers: httpheaders,
 });
}

//post State api
createSmstemplate() {
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });   
  return this.http.post(baseURL + 'AdminSMSTemplate/Create', this.smsModel, {
    headers: httpheaders,
  });
}

 //get  State api with Id
 getSmstemplate(id: any) {

  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });

  return this.http.get(`${baseURL + 'AdminSMSTemplate/Details?id='}${id}`, {
    headers: httpheaders,
  });
}

//edit State api with Id
editSmstemplate() {

  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  
  return this.http.post(baseURL + 'AdminSMSTemplate/Edit', this.smsModel, {
    headers: httpheaders,
  });
}

 //delete State api with Id
 deleteSmstemplate(id: any) {
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  this.smsModel.id = id  
  this.smsModel.adminId= localStorage.getItem('userId');
  return this.http.post(baseURL + 'AdminSMSTemplate/Delete?Id=', this.smsModel, {
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
