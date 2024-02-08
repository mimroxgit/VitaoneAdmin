import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { courseParticipant, DeleteItemsModule, editCourseParticipant, groupVariants, imageDel, Items, ItemsModule } from '../models/items.model';

//add api Url
const baseURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient,private router: Router) {}

  //add model
  item: Items = new Items();
  grpvariant: groupVariants = new groupVariants();
  imagedel: imageDel = new imageDel();
  itemdl: ItemsModule = new ItemsModule();
  courseParticipant: courseParticipant = new courseParticipant();
  Deleteitemdl: DeleteItemsModule = new DeleteItemsModule();
  EditCourseParticipant:editCourseParticipant=new editCourseParticipant();
  
  
  //get  Items  groupVariant api with Id & name
  getGroupVariant(id: any,name:any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminItems/GetVariant?id='}${id}&name=${name}`, {
      headers: httpheaders,
    });
  }
 
  //update  Items  groupVariant api
  updateGroupVariant(itm:any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });         
    return this.http.post(baseURL + 'AdminItems/UpdateVariant',itm, {
      headers: httpheaders,
    });
  }

   //get Active Items list in Practitione Group
   listActitm() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminItems/List1'}`, {
      headers: httpheaders,
    })
  }

  //get Active Items list in Practitione Group
  listActitm1() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminItems/List2'}`, {
      headers: httpheaders,
    })
  }
  
 
  //get Active Items list in dropdown
  listActitems() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminItems/ActiveList'}`, {
      headers: httpheaders,
    })
  }
  //get Active Items list in dropdown
  listActitemsDD() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminItems/ActiveListDD'}`, {
      headers: httpheaders,
    })
  }
  
  //get Items list
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
  
  //post Items api
  createItems() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });               
    return this.http.post(baseURL + 'AdminItems/Create', this.item, {headers: httpheaders,});
  }
  
  //get  Items detail api with Id
  getDetail(id: any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminItems/Details?id='}${id}`, {
      headers: httpheaders,
    });
  }
  

  //edit Items api with Id
  editItems() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });            
    return this.http.post(baseURL + 'AdminItems/Edit', this.item, {
      headers: httpheaders,
    });
  }

  //delete Image api with Id
  deleteImage(id: any,img:any) {
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    this.imagedel.id = id   
    this.imagedel.image = img
    return this.http.post(baseURL + 'AdminItems/DeleteImage?Id=', this.imagedel, {
      headers: httpheaders,
    });
  }

  //Set Default Image api with Id
  setDefaultImage(id: any,img:any) {
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    this.imagedel.id = id   
    this.imagedel.image = img
    return this.http.post(baseURL + 'AdminItems/SetDefaultImage?Id=', this.imagedel, {
      headers: httpheaders,
    });
  }
   
  //delete Items api with Id
  deleteItems(id: any) {
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    this.item.id = id
    this.item.adminId = localStorage.getItem('userId');
    return this.http.post(baseURL + 'AdminItems/Delete?Id=', this.item, {
      headers: httpheaders,
    });
  }
 

  
  //post ItemsModule api
  createItemsModule() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });           
    return this.http.post(baseURL + 'AdminItems/AddModule', this.itemdl, {headers: httpheaders,});
  }

  //post ItemsModule api
  deleteItemsModule(id: any,itmId:any) {
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers':
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    this.Deleteitemdl.id = itmId
    this.Deleteitemdl.moduleId = id
    this.Deleteitemdl.adminId = localStorage.getItem('userId');    
    return this.http.post(baseURL + 'AdminItems/DeleteModule?Id=', this.Deleteitemdl, {
      headers: httpheaders,
    });
  }
  
   //get Items GetParticipant
   listGetParticipant(id:any) {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });
    return this.http.get(`${baseURL + 'AdminItems/GetParticipant?id='}${id}`, {    
      headers: httpheaders,
    })
  }

  //Add Course Participant
  addParticipant() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });         
    return this.http.post(baseURL + 'AdminItems/AddParticipant', this.courseParticipant, {headers: httpheaders,});
    
  }

  //DeleteCourse Participant
  DeleteParticipant() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });         
    return this.http.post(baseURL + 'AdminItems/DeleteParticipant', this.courseParticipant, {headers: httpheaders,});
    
  }


   //Update Participant
   UpdateParticipant() {
    //add httpheaders
    const httpheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('loginToken')}`,
    });         
    return this.http.post(baseURL + 'AdminItems/UpdateParticipant', this.EditCourseParticipant, {headers: httpheaders,});
    
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
