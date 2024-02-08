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
export class ReportsService {

  constructor(private http: HttpClient,private router: Router) {}          

  //get Sales report
  listSalesreport(fdate:any,tdate:any,patientId:any,practitionerId:any,status:any,pstatus:any,mode:any,orderBy:any,rpStatus:any) {

    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
  
    return this.http.get(`${baseURL + 'AdminReport/Sales?fdate='}${fdate}&tdate=${tdate}&patientId=${patientId}&practitionerId=${practitionerId}&status=${status}&pStatus=${pstatus}&mode=${mode}&orderBy=${orderBy}&rps=${rpStatus}`, {    
      headers: httpheaders,
    }).pipe(
      catchError(this.errorHandler)
      
    )   
  }

  //get Product Sales report
  listPrdSalesreport(fdate:any,tdate:any) {
    //listPrdSalesreport(fdate:any,tdate:any,patientId:any,practitionerId:any,status:any,pstatus:any,mode:any,orderBy:any,rpStatus:any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminReport/ProdcutWiseSales?fdate='}${fdate}&tdate=${tdate}`, {    
   // return this.http.get(`${baseURL + 'AdminReport/ProdcutWiseSales?fdate='}${fdate}&tdate=${tdate}&patientId=${patientId}&practitionerId=${practitionerId}&status=${status}&pStatus=${pstatus}&mode=${mode}&orderBy=${orderBy}&rps=${rpStatus}`, {    
      headers: httpheaders,
    }).pipe(
      catchError(this.errorHandler)
      
    )   
  }

  //get Order Summary Report
  listOrderSummary(fdate:any,tdate:any) {
    //listPrdSalesreport(fdate:any,tdate:any,patientId:any,practitionerId:any,status:any,pstatus:any,mode:any,orderBy:any,rpStatus:any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminReport/OrderSummary?fdate='}${fdate}&tdate=${tdate}`, {    
   // return this.http.get(`${baseURL + 'AdminReport/ProdcutWiseSales?fdate='}${fdate}&tdate=${tdate}&patientId=${patientId}&practitionerId=${practitionerId}&status=${status}&pStatus=${pstatus}&mode=${mode}&orderBy=${orderBy}&rps=${rpStatus}`, {    
      headers: httpheaders,
    }).pipe(
      catchError(this.errorHandler)
     
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
