import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Country } from '../models/country.model';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  

  constructor(private http: HttpClient,private router: Router) {}

   //add model
   cnt: Country = new Country();  
   

    //get Active Country list
    ActivelistCountry() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    
    return this.http.get(`${baseURL + 'AdminCountry/ActiveList'}`, {
      headers: httpheaders,
    });
  }

  //get Country list
  listCountry() {

    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    
    return this.http.get(`${baseURL + 'AdminCountry/List'}`, {
      headers: httpheaders,
    }).pipe(
      catchError(this.errorHandler)
      //console.log("err",error)
    )   
  }
 
  //post Country api
  createCountry() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    
    return this.http.post(baseURL + 'AdminCountry/Create', this.cnt, {
      headers: httpheaders,
    });
  }

   //get  Country api with Id
   getCountry(id: any) {

    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });

    return this.http.get(`${baseURL + 'AdminCountry/Details?id='}${id}`, {
      headers: httpheaders,
    });
  }

  //edit Country api with Id
  editCountry() {

    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    
    return this.http.post(baseURL + 'AdminCountry/Edit', this.cnt, {
      headers: httpheaders,
    });
  }

   //delete Country api with Id
   deleteCountry(id: any) {
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers':
        "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    this.cnt.Id = id
    return this.http.post(baseURL + 'AdminCountry/Delete?Id=', this.cnt, {
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
