import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { AssPractitioner, Practitioners } from '../models/practitioners.model';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PractitionersService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  practitioners: Practitioners = new Practitioners();
  assPractitioners: AssPractitioner = new AssPractitioner();


  //get Practitioners list Drop Down use
  PractitionerDD() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminPractitioner/ActiveListDD'}`, {
      headers: httpheaders,
    });
  }

  //get Patient list Drop Down use
  PatientDD() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminPatient/PatientListDD'}`, {
      headers: httpheaders,
    });
  }
  
  //get ListByGroup Practitioners list
  listgrpra(id:any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminPractitioner/ListByGroup'}?id=${id}`, {
      headers: httpheaders,
    });
  }
  
   //get Practitioners list
   listPractitioners() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminPractitioner/List'}`, {
      headers: httpheaders,
    });
  }
  
  //get Practitioners list
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
  
  //get Active Practitioners list
  listActivePractitioners() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminPractitioner/ActiveList'}`, {
      headers: httpheaders,
    });
  }
  
  //post Practitioners api
  createPractitioners() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.post(baseURL + 'AdminPractitioner/Create', this.practitioners, {
      headers: httpheaders,
    });
  }
  
  //get  Practitioners api with Id
  getPractitioners(id: any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminPractitioner/Details?id='}${id}`, {
      headers: httpheaders,
    });
  }
  
  //edit Practitioners api with Id
  editPractitioners() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.post(baseURL + 'AdminPractitioner/Edit', this.practitioners, {
      headers: httpheaders,
    });
  }
  
  //delete Practitioners api with Id
  deletePractitioners(id: any) {
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    this.practitioners.id = id
    this.practitioners.adminId = localStorage.getItem('userId');
    return this.http.post(baseURL + 'AdminPractitioner/Delete?Id=', this.practitioners, {
      headers: httpheaders,
    });
  }

   //get  Practitioner Wise PatientsList
   getPracPatients(id: any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminPractitioner/PatientsList?id='}${id}`, {
      headers: httpheaders,
    });
  }

   //get  Patients  api with Id
   getPatients(id: any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminPatient/Details?id='}${id}`, {
      headers: httpheaders,
    });
  }

  //get  Practitioner Wise PatientsList Order
  getPracPatientsOrd(id: any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminOrder/PatientOrders?id='}${id}`, {
      headers: httpheaders,
    });
  }

  //get  Practitioner Wise Coupon Code List
  getPracCoupon(id: any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminPractitioner/CouponList?id='}${id}`, {
      headers: httpheaders,
    });
  }

  //get  Practitioner Wise Transaction List
  getPracTransaction(id:any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminPractitioner/GetTransaction1?id='}${id}`, {
      headers: httpheaders,
    });
  }


  //post assign Practitioners api
  assignPractitioners() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.post(baseURL + 'AdminPatient/AssignPractitioner', this.assPractitioners, {
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
