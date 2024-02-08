import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';
import { Blog } from '../models/blog.model';
import { catchError, throwError } from 'rxjs';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  blog: Blog = new Blog();
  
  //get Active blog list in dropdown
 listActblog() {
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
 
  return this.http.get(`${baseURL + 'AdminBlog/List'}`, {
    headers: httpheaders,
  })
}  



//post blog api
createBlog() {
 
 //add httpheaders
 const httpheaders = new HttpHeaders({
   'Content-Type': 'application/json',
   'Access-Control-Allow-Origin': '*',
   Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
 });
 return this.http.post(baseURL + 'AdminBlog/Create', this.blog, {headers: httpheaders,});
}

//get  blog detail api with Id
getDetail(id: any) {

  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });

  return this.http.get(`${baseURL + 'AdminBlog/Details?id='}${id}`, {
    headers: httpheaders,
  });
}

 //edit blog api with Id
 editBlog() {

  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  
  return this.http.post(baseURL + 'AdminBlog/Edit', this.blog, {
    headers: httpheaders,
  });
}

//delete blog api with Id
deleteBlog(id: any) {
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });
  this.blog.id = id
  return this.http.post(baseURL + 'AdminBlog/Delete?Id=', this.blog, {
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
