import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { PayNow } from '../models/orders.model';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PaymentmanagementService {

  constructor(private http: HttpClient,private router: Router) {}

   //add model
   pay: PayNow = new PayNow();


  //get Transaction list
  listPaymentmanagemen() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    
    return this.http.get(`${baseURL + 'AdminTransaction/GetTransactionList'}`, {
      headers: httpheaders,
    }).pipe(
      catchError(this.errorHandler)      
      )
  }

  //get Transaction list
  GetTransactionByPractioner(id:any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    
    return this.http.get(`${baseURL + 'AdminTransaction/GetTransactionByPractioner?id='}${id}`, {
      headers: httpheaders,
    }).pipe(
      catchError(this.errorHandler)      
      )
  }

  //post Transaction Payment api
 trnPayment() {
  
  //add httpheaders
  const httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
  });  
  return this.http.post(baseURL + 'AdminTransaction/Payment', this.pay, {headers: httpheaders,});
 }

  //get Paid  Transaction list
  GetTransactionByPractionerPaid(id:any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    
    return this.http.get(`${baseURL + 'AdminTransaction/GetTransactionByPractioner1?id='}${id}`, {
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
