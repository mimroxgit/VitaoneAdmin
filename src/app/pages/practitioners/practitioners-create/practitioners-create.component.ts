import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { CityService } from 'src/app/services/city.service';
import { PractitionercategoriesService } from 'src/app/services/practitionercategories.service';
import { PractitionergroupService } from 'src/app/services/practitionergroup.service';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-practitioners-create',
  templateUrl: './practitioners-create.component.html',
  styleUrls: ['./practitioners-create.component.css']
})
export class PractitionersCreateComponent {

  practitionerslistUrl = "/" + environment.practitionersList
 
  groupactivelist:any;
  groupId = '-';
  pracategoryactivelist:any;
  categoryId = '-';
  stateactivelist: any;
  name: any;
  stateId : any;
  cityactivelist:any;
  cityactivelistAll:any;
  cityId :any ;
 
  adminId: any;  
  pcmName:any;
  pcmSlug:any;
  pcmClinicName:any;
  pcmContactNo:any;
  pcmEmail:any;
  pcmPassword:any;
  pcmAddress:any;
  pcmIsActive=true;
  pcmIsDefault:any;
   

  loading = false;
  mes: any;
  response: any;
  nameMessage: any;
  ClinicNameMessage:any;
  slugMessage:any
  contactMessage:any
  pracategorydropdownMessage:any;
  statedropdownMessage:any;
  groupdropdownMessage:any;
  citydropdownMessage:any;
  emailMessage:any;
  passwordMessage:any;
  addressMessage: any;
  errorCount = 0;
  @Input() Isshowselectbox = true; 

  constructor(
    public practitionergroupService: PractitionergroupService,
    public PraCategoriesService:PractitionercategoriesService,
    public stateService: StateService,
    public cityService: CityService,
    public practitionersService:PractitionersService,
    private router: Router
  ) {   
    this.grouplistactive();
    this.pracategorylistactive();
    this.statelistactive();
    this.citylistactive();
  }

  //Group
  onGroup(id: any) {
    this.practitionersService.practitioners.groupId = id;
    this.groupId = this.practitionersService.practitioners.groupId;
  }

  //Category
  onCategory(id: any) {
    this.practitionersService.practitioners.categoryId = id;
    this.categoryId = this.practitionersService.practitioners.categoryId;
  }

  //State
  onState(id: any) {
    let stateList:any=[]; 
    if(id=="-"){
      this.cityactivelist=this.cityactivelistAll;
     }else{      
      stateList=this.cityactivelistAll.filter((a:any)=>a.stateId==id)           
      this.cityactivelist=stateList;
     }  
     this.stateId = id    
  }

  //City
  onCity(id: any) {
    this.practitionersService.practitioners.cityId = id;
    this.cityId = this.practitionersService.practitioners.cityId;
  }

   //get the list from Group actvie
   private grouplistactive() {
    this.groupactivelist = null;
    this.practitionergroupService.listActpragroup().subscribe({
      next: (data) => {        
        this.groupactivelist = data;                
      },     
    });
  }

  //get the list from Category actvie
  private pracategorylistactive() {
    this.pracategoryactivelist = null;
    this.PraCategoriesService.listActpracategories().subscribe({
      next: (data) => {        
        this.pracategoryactivelist = data;                  
      },     
    });
  }

   //get the list from State actvie
   private statelistactive() {
    this.stateactivelist = null;
    this.stateService.listActiveState().subscribe({
      next: (data) => {        
        this.stateactivelist = data;          
      },     
    });
  }

  //get the list from City actvie
  private citylistactive() {
    this.cityactivelist = null;
    this.cityService.listActiveCity().subscribe({
      next: (data) => {        
        this.cityactivelist = data;  
        this.cityactivelistAll = data;               
      },     
    });
  }

  //check Email validation
  validateEmail(emailAddress: any) {
    var pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var res = pattern.test(emailAddress);
    return res;
  } 

   //check Mobile validation
   validateMobile(mobileNo: any) {
    var pattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    var res = pattern.test(mobileNo);
    return res;
  }

  //check Number validation
  containsOnlyNumbers(str: any) {
    return /^\d+$/.test(str);
  }

  //post for Practitioners Create
  onSubmit(form: NgForm) {
    this.errorCount = 0;

     //Group dropdown validation
     if (this.groupId == '-') {
      this.errorCount++;
      this.groupdropdownMessage = 'Please select group';
    } else {
      this.groupdropdownMessage = '';
    }

    //Category dropdown validation
    if (this.categoryId == '-') {
      this.errorCount++;
      this.pracategorydropdownMessage = 'Please select category';
    } else {
      this.pracategorydropdownMessage = '';
    }

    //State dropdown validation
    // if (this.stateId == '-') {
    //   this.errorCount++;
    //   this.statedropdownMessage = 'Please select state';
    // } else {
    //   this.statedropdownMessage = '';
    // }

    //City dropdown validation
    // if (this.cityId == '-') {
    //   this.errorCount++;
    //   this.citydropdownMessage = 'Please select city';
    // } else {
    //   this.citydropdownMessage = '';
    // }

    //Name validation
    if (this.pcmName == undefined) {
      this.errorCount++;
      this.nameMessage = 'Please enter name';
    } else {
      if (this.pcmName.trim() == '') {
        this.errorCount++;
        this.nameMessage = 'Please enter valid name';
      } else {       
          this.nameMessage = '';       
      }
    }   

     //Clinic Name validation
     if (this.pcmClinicName == undefined) {
      this.errorCount++;
      this.ClinicNameMessage = 'Please enter clinic name';
    } else {
      if (this.pcmClinicName.trim() == '') {
        this.errorCount++;
        this.ClinicNameMessage = 'Please enter valid clinic name';
      } else {       
          this.ClinicNameMessage = '';       
      }
    }   

    //slug validation
    if (this.pcmSlug == undefined) {
      this.errorCount++;
      this.slugMessage = 'Please enter store url';
    } else {
      if (this.pcmSlug.trim() == '') {
        this.errorCount++;
        this.slugMessage = 'Please enter valid store url';
      } else {       
          this.slugMessage = '';       
      }
    }   

    //Mobile Validation    
    if (this.pcmContactNo != undefined && this.pcmContactNo != '') {
    
      var isNumber = this.containsOnlyNumbers(this.pcmContactNo);
      if (isNumber == true) {
        var validateMobile = this.validateMobile(this.pcmContactNo);
        if (validateMobile == false) {
          this.errorCount++;
          this.contactMessage = 'Please enter valid contact number';
        } else {
          this.contactMessage = '';
        }
      } else {
        if (this.pcmContactNo.trim() == '') {
          this.errorCount++;
          this.contactMessage = 'Please enter valid contact number';
        } else {
          this.contactMessage = '';
        }
      }
    }

     //Username Validation
     if (this.pcmEmail == undefined) {
      this.errorCount++;
      this.emailMessage = 'Please enter email';
    } else {
      if (this.pcmEmail.trim() == '') {
        this.errorCount++;
        this.emailMessage = 'Please enter valid email';
      } else {       
          var validateEmail = this.validateEmail(this.pcmEmail);
          if (validateEmail == false) {
            this.errorCount++;
            this.emailMessage = 'Please enter valid email';
          } else {
            this.emailMessage = '';
          }        
      }
    }

    //Password validation
    if (this.pcmPassword == undefined) {
      this.errorCount++;
      this.passwordMessage = 'Please enter password';
    } else {
      this.passwordMessage = '';
      if (this.pcmPassword.trim() == '') {
        this.errorCount++;
        this.passwordMessage = 'Please enter valid password';
      }
    }

    //Address validation
    // if (this.pcmAddress == undefined) {
    //   this.errorCount++;
    //   this.addressMessage = 'Please enter address';
    // } else {
    //   if (this.pcmAddress.trim() == '') {
    //     this.errorCount++;
    //     this.addressMessage = 'Please enter valid address';
    //   } else {       
    //       this.addressMessage = '';       
    //   }
    // }

    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');

      this.practitionersService.practitioners.adminId = this.adminId;
      this.practitionersService.practitioners.pcmName = this.pcmName;
      this.practitionersService.practitioners.pcmClinicName = this.pcmClinicName;
      
      if(this.pcmContactNo == undefined){
        this.practitionersService.practitioners.pcmContactNo = "-";
      }else{
        this.practitionersService.practitioners.pcmContactNo = this.pcmContactNo;
      }
      this.practitionersService.practitioners.pcmEmail = this.pcmEmail;
      this.practitionersService.practitioners.pcmPassword = this.pcmPassword;
      if(this.pcmAddress == undefined){
        this.practitionersService.practitioners.pcmAddress = "-";      
      }else{
        this.practitionersService.practitioners.pcmAddress = this.pcmAddress;      
      }
      
      this.practitionersService.practitioners.pcmIsActive = this.pcmIsActive;
      this.practitionersService.practitioners.pcmIsDefault = this.pcmIsDefault;
      if(this.stateId == undefined){
        this.practitionersService.practitioners.stateId = "000000000000000000000000";
      }else{
        this.practitionersService.practitioners.stateId = this.stateId;
      }
      if(this.cityId == undefined){
        this.practitionersService.practitioners.cityId = "000000000000000000000000";
      }else{
        this.practitionersService.practitioners.cityId = this.cityId;
      }
      
      this.practitionersService.practitioners.pcmPasswordKey = "-";
      this.practitionersService.practitioners.pcmSlug = this.pcmSlug

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start Practitioners create service
        this.practitionersService.createPractitioners().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.practitionersService.practitioners.pcmName = '';
            this.router.navigate([environment.practitionersList]);
          }
        });
      }
    }
  }
}
