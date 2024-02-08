import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { City } from '../models/city.model';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  cty: City = new City();
  
  
  //get City list
  listCity() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminCity/List'}`, {
      headers: httpheaders,
    }).pipe(
      catchError(this.errorHandler)
    )   
  }
  
  //get Active City list
  listActiveCity() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminCity/ActiveList'}`, {
      headers: httpheaders,
    });
  }
  
  //post City api
  createCity() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.post(baseURL + 'AdminCity/Create', this.cty, {
      headers: httpheaders,
    });
  }
  
  //get  City api with Id
  getCity(id: any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminCity/Details?id='}${id}`, {
      headers: httpheaders,
    });
  }
  
  //edit City api with Id
  editCity() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.post(baseURL + 'AdminCity/Edit', this.cty, {
      headers: httpheaders,
    });
  }
  
  //delete City api with Id
  deleteCity(id: any) {
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'*',
      'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    this.cty.id = id
    return this.http.post(baseURL + 'AdminCity/Delete?Id=', this.cty, {
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
