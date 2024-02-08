import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  //cat: Categories = new Categories();

   
 //get Patient list in dropdown
 listPatient(fdate:any,tdate:any,practitionerId:any,regBy:any) {
   //add httpheaders
   const httpheaders = new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
   });   
   return this.http.get(`${baseURL + 'AdminPatient/List?fromdate='}${fdate}&todate=${tdate}&pId=${practitionerId}&regBy=${regBy}`, {
     headers: httpheaders,
   })
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
