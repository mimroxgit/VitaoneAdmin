import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Practitionergroup } from '../models/practitionergroup.model';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PractitionergroupService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  pragroup: Practitionergroup = new Practitionergroup();
  
  //get Active Practitioner Group list in dropdown
  listActpragroup() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminPractitionerGroup/ActiveList'}`, {
      headers: httpheaders,
    })
  }
  
  //get Practitioner Group list
  listParGroup() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminPractitionerGroup/List'}`, {
      headers: httpheaders,
    }).pipe(
      catchError(this.errorHandler)
      //console.log("err",error)
    )   
  }
  
  //post Practitioner Group api
  createpraGroup() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });    
    return this.http.post(baseURL + 'AdminPractitionerGroup/Create', this.pragroup, {headers: httpheaders,});
  }
  
  //get  Practitioner Group detail api with Id
  getDetail(id: any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminPractitionerGroup/Details?id='}${id}`, {
      headers: httpheaders,
    });
  }
  
  //edit Practitioner Group api with Id
  editpraGroup() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });    
    return this.http.post(baseURL + 'AdminPractitionerGroup/Edit', this.pragroup, {
      headers: httpheaders,
    });
  }
  
  //get  Practitioner Group details api with Id
  getData(id: any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminPractitionerGroup/GetData?id='}${id}`, {
      headers: httpheaders,
    });
  }

  
 //delete Practitioner Group api with Id
 deletepraGroup(id: any) {
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': '*',
     'Access-Control-Allow-Headers':
       "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   this.pragroup.id = id
   this.pragroup.adminId = localStorage.getItem('userId');
   return this.http.post(baseURL + 'AdminPractitionerGroup/Delete?Id=', this.pragroup, {
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
