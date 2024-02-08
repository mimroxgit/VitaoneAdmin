import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Inventory } from '../models/inventory.model';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  inv: Inventory = new Inventory();
  
  
  //get Inventory list
  listInventory() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminInventory/List'}`, {
      headers: httpheaders,
    }).pipe(
      catchError(this.errorHandler)
    )   
  }
  
 
  
  //post Inventory api
  createInventory() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.post(baseURL + 'AdminInventory/Create', this.inv, {
      headers: httpheaders,
    });
  }
  
  //get  Inventory api with Id
  getInventory(id: any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminInventory/Details?id='}${id}`, {
      headers: httpheaders,
    });
  }
  
  //edit Inventory api with Id
  editInventory() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.post(baseURL + 'AdminCity/Edit', this.inv, {
      headers: httpheaders,
    });
  }
  
  //delete Inventory api with Id
  deleteInventory(id: any) {
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'*',
      'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    this.inv.id = id
    return this.http.post(baseURL + 'AdminCity/Delete?Id=', this.inv, {
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
