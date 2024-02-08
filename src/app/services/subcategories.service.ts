import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Subcategories } from '../models/subcategories.model';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  subcat: Subcategories = new Subcategories();

   
 //get Active Sub Categories list in dropdown
 listActScategories() {
   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
  
   return this.http.get(`${baseURL + 'AdminSubCategories/ActiveList'}`, {
     headers: httpheaders,
   })
 }  
 
 //get Sub Categories list 
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

 //post Sub Categories api
 createSCategories() {
  
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  return this.http.post(baseURL + 'AdminSubCategories/Create', this.subcat, {headers: httpheaders,});
 }

 //get Sub Categories detail api with Id
 getSCatDetail(id: any) {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });

   return this.http.get(`${baseURL + 'AdminSubCategories/Details?id='}${id}`, {
     headers: httpheaders,
   });
 }
 
  //edit Sub Categories api with Id
  editSCategories() {

   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   
   return this.http.post(baseURL + 'AdminSubCategories/Edit', this.subcat, {
     headers: httpheaders,
   });
 }

 //delete Sub Categories api with Id
 deleteSCategories(id: any) {
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': '*',
     'Access-Control-Allow-Headers':
       "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });
   this.subcat.id = id
   return this.http.post(baseURL + 'AdminSubCategories/Delete?Id=', this.subcat, {
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
