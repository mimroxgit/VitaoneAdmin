import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(@Inject(DOCUMENT) private document: Document,
    private router: Router) {     
    }
  dashboardUrl              = "/" + environment.home  
  categorieslistUrl         = "/" + environment.categoriesList;
  subcategorieslistUrl      = "/" + environment.subcategoriesList;
  itemunitslistUrl          = "/" + environment.itemunitsList;
  parcategorieslistUrl      = "/" + environment.practitionercategoriesList;
  pargrouplistUrl           = "/" + environment.practitionergroupList;
  practitionerslistUrl      = "/" + environment.practitionersList;
  patientlistUrl            = "/" + environment.patientList;
  itemslistUrl              = "/" + environment.itemsList;
  courierlistUrl            = "/" + environment.courierList;
  couponlistUrl             = "/" + environment.couponList;
  paymentgatewaylistUrl     = "/" + environment.paymentgatewayList;
  paymentManagementlistUrl  = "/" + environment.paymentmanagementList;  
  countrylistUrl            = "/" + environment.countryList;
  statelistUrl              = "/" + environment.stateList;
  citylistUrl               = "/" + environment.cityList;
  doselistUrl               = "/" + environment.dosesList;
  templateUrl               = "/" + environment.templateList;
  webpagesUrl               = "/" + environment.webPages 
  settingsUrl               = "/" + environment.settings; 
  orderslistUrl             = "/" +environment.ordersList;
  smsTemplateUrl            = "/" + environment.smsTemplateList; 
  productreviewUrl          = "/" + environment.productReviewList; 
  inquirylistUrl            = "/" + environment.inquiry; 
  salesreplistUrl           = "/" + environment.salesReportList; 
  productsalesreplistUrl    = "/" + environment.productsalesReportList; 
  ordersummaryreplistUrl    = "/" + environment.orderSummaryReportList; 
  inventorylistUrl          = "/" + environment.inventoryList; 
  blogListlistUrl           = "/" + environment.blogList; 
  moduleListlistUrl         = "/" + environment.moduleList; 
  lessonListlistUrl         = "/" + environment.lessonList; 
  courseListlistUrl         = "/" + environment.courseList; 
  InitiatedorderlistUrl     = "/" + environment.initiatedOrderList; 
  
  
  //Logout 
  logout(): void {
    localStorage.clear();
    this.router.navigate([environment.login]);
  }
  
  //sidebar toggle open & close
  sidebarToggle(){
    let wdth = this.document.body.clientWidth;    
    if(wdth<=767){
      this.document.body.classList.toggle('toggle-sidebar');
    }    
  }

}
