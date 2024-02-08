import { Component } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  categorieslistUrl         = "/" + environment.categoriesList;
  subcategorieslistUrl      = "/" + environment.subcategoriesList;
  parcategorieslistUrl      = "/" + environment.practitionercategoriesList;
  itemslistUrl              = "/" + environment.itemsList;
  couriercompanylistUrl     = "/" + environment.courierList;
  couponmanagementlistUrl   = "/" + environment.couponList;
  paymentManagementlistUrl  = "/" + environment.paymentmanagementList;  
  practitionerslistUrl      = "/" + environment.practitionersList;
  patientlistUrl            = "/" + environment.patientList;
  orderslistUrl             = "/" + environment.ordersList;
  webpagesUrl               = "/" + environment.webPages;
  inquirylistUrl            = "/" + environment.inquiry;
  bloglistUrl               = "/" + environment.blogList;
  settingsUrl               = "/" + environment.settings;

  pralist:any
  pralistloading:any

  constructor(
    private dashboardService : DashboardService,
    public ordersService : OrderService,){
    this.recpralist()
    this.recOrder()
    this.recPatient()

  }



   //get the list from City
   private recpralist() {
    this.pralist = null;
    this.pralistloading = true;
    this.dashboardService.recentPractitioners().subscribe({
      next: (data: any) => {                  
        this.pralist = data;        
        this.pralistloading = false;
      },
    });
  }
  //************************ Start Recent Orders*************************************** */
  recOrdlist:any
  recOrdlistloading = true
   //get the list order
   private recOrder() {
    this.recOrdlist = null;
    this.recOrdlistloading = true;
    this.ordersService.recentOrders().subscribe({
      next: (data: any) => {   
                        
        this.recOrdlist = data;
        this.recOrdlistloading = false;
      },
    });
  }
  //************************* End Recent Orders************************************************ */

   //************************ Start Recent Patient********************************************** */

   recPatientlist:any
   recPatientloading = true
    //get the list order
    private recPatient() {
     this.recPatientlist = null;
     this.recPatientloading = true;
     this.dashboardService.recentpatients().subscribe({
       next: (data: any) => {                               
         this.recPatientlist = data;
         this.recPatientloading = false;
       },
     });
   }
   //********************** End Recent Patient*************************************************** */
}
