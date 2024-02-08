import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Couponmanagement } from '../models/couponmanagement.model';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CouponmanagementService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  coupon: Couponmanagement = new Couponmanagement();
  
  //get Coupon Management list
  listCoupon(fromDate:any,toDate:any,pId:any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminCouponCode/List'}?fromDate=${fromDate}&toDate=${toDate}&pId=${pId}`, {
      headers: httpheaders,
    }).pipe(
      catchError(this.errorHandler)
      //console.log("err",error)
    )   
  }
 
  //get Active Coupon Management list
  listActiveCoupon() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminCouponCode/ActiveList'}`, {
      headers: httpheaders,
    });
  }
  
  //post Coupon Management api
  createCoupon() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.post(baseURL + 'AdminCouponCode/Create', this.coupon, {
      headers: httpheaders,
    });
  }
  
  //get  Coupon Management api with Id
  getCoupon(id: any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminCouponCode/Details?id='}${id}`, {
      headers: httpheaders,
    });
  }
  
  //edit Coupon Management api with Id
  editCoupon() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.post(baseURL + 'AdminCouponCode/Edit', this.coupon, {
      headers: httpheaders,
    });
  }
  
  //delete Coupon Management api with Id
  deleteCoupon(id: any) {
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    this.coupon.id = id
    this.coupon.adminId = localStorage.getItem('userId');
    return this.http.post(baseURL + 'AdminCouponCode/Delete?Id=', this.coupon, {
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



