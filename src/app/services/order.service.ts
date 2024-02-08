import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { OrdDispatch, OrdersStatus, PatientAddress, ordId, orderInitiate, orderInvoice } from '../models/orders.model';

  //add api Url
  const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  ordStatus: OrdersStatus = new OrdersStatus();
  orderId: orderInvoice=new orderInvoice();
  ordDispatch : OrdDispatch = new OrdDispatch()
  patAdd : PatientAddress = new PatientAddress()
  ordInitiate : orderInitiate = new orderInitiate()
  
  

  //get Recent Orders list
  recentOrders() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });    
    return this.http.get(`${baseURL + 'AdminOrder/GetRecentOrder'}`, {
      headers: httpheaders,
    })
  }
  

   //get Orders list
   listOrders(fdate:any,tdate:any,patientId:any,practitionerId:any,status:any,pstatus:any,mode:any,orderBy:any,rpStatus:any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });    
    return this.http.get(`${baseURL + 'AdminOrder/GetOrderList?fdate='}${fdate}&tdate=${tdate}&patientId=${patientId}&practitionerId=${practitionerId}&status=${status}&pStatus=${pstatus}&mode=${mode}&orderBy=${orderBy}&rps=${rpStatus}`, {
      headers: httpheaders,
    }).pipe(
      catchError(this.errorHandler)      
      )
  }

  //get Initiated Orders list
  listInitiatedOrders(fdate:any,tdate:any,patientId:any,practitionerId:any,status:any,pstatus:any,mode:any,orderBy:any,rpStatus:any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });    
    return this.http.get(`${baseURL + 'AdminOrder/GetOrderList1?fdate='}${fdate}&tdate=${tdate}&patientId=${patientId}&practitionerId=${practitionerId}&status=${status}&pStatus=${pstatus}&mode=${mode}&orderBy=${orderBy}&rps=${rpStatus}`, {
      headers: httpheaders,
    }).pipe(
      catchError(this.errorHandler)      
      )
  }

  //get Payment Gateway Orders list
  getlistPaymentGatewayOrders(pgmId:any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });    
    return this.http.get(`${baseURL + 'AdminOrder/GetPGOrderDetails?id='}${pgmId}`, {
      headers: httpheaders,
    }).pipe(
      catchError(this.errorHandler)      
      )
  }

   //update Payment Gateway Orders list status
   updateInitiateOrder() {

    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });            
    return this.http.post(baseURL + 'AdminOrder/UpdateInitiateOrder', this.ordInitiate, {
      headers: httpheaders,
    });
  }

   //get Order Details api with Id
   getOrders(id: any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminOrder/GetOrderDetail?id='}${id}`, {
      headers: httpheaders,
    });
  }

  //get Order transtion Details api with Id
  getOrderstrnstion(id: any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminOrder/GetTransaction?id='}${id}`, {
      headers: httpheaders,
    });
  }

  //update order Status  api
  orderStatusupdate() {

    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });            
    return this.http.post(baseURL + 'AdminOrder/Status', this.ordStatus, {
      headers: httpheaders,
    });
  }

  //update order Dispatch  api
  orderDispatch() {

    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });         
    return this.http.post(baseURL + 'AdminOrder/Dispatch', this.ordDispatch, {
      headers: httpheaders,
    });
  }

  
   //update patient address  api
   editAddres() {

    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });         
    return this.http.post(baseURL + 'AdminOrder/UpdateAddress', this.patAdd, {
      headers: httpheaders,
    });
  }

  //Pdf Download  api
  pdfDownload(id:any) {
    //add httpheaders
    this.orderId.id = id
    return this.http.post(baseURL + 'Invoice', this.orderId,{responseType:"blob"});
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
