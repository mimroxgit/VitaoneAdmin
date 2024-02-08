import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environments';
import { AuthGuard } from './auth.guard';
import { CategoriesCreateComponent } from './pages/categories/categories-create/categories-create.component';
import { CategoriesEditComponent } from './pages/categories/categories-edit/categories-edit.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CityCreateComponent } from './pages/city/city-create/city-create.component';
import { CityEditComponent } from './pages/city/city-edit/city-edit.component';
import { CityListComponent } from './pages/city/city-list/city-list.component';
import { CountryCreateComponent } from './pages/country/country-create/country-create.component';
import { CountryEditComponent } from './pages/country/country-edit/country-edit.component';
import { CountryListComponent } from './pages/country/country-list/country-list.component';
import { CouponmanagementCreateComponent } from './pages/couponmanagement/couponmanagement-create/couponmanagement-create.component';
import { CouponmanagementEditComponent } from './pages/couponmanagement/couponmanagement-edit/couponmanagement-edit.component';
import { CouponmanagementListComponent } from './pages/couponmanagement/couponmanagement-list/couponmanagement-list.component';
import { CouriercompanyCreateComponent } from './pages/couriercompany/couriercompany-create/couriercompany-create.component';
import { CouriercompanyEditComponent } from './pages/couriercompany/couriercompany-edit/couriercompany-edit.component';
import { CouriercompanyListComponent } from './pages/couriercompany/couriercompany-list/couriercompany-list.component';
import { DosesCreateComponent } from './pages/doses/doses-create/doses-create.component';
import { DosesEditComponent } from './pages/doses/doses-edit/doses-edit.component';
import { DosesListComponent } from './pages/doses/doses-list/doses-list.component';
import { ForgotpwdComponent } from './pages/forgotpwd/forgotpwd.component';
import { HomeComponent } from './pages/home/home.component';
import { ItemsCreateComponent } from './pages/items/items-create/items-create.component';
import { ItemsDetailsComponent } from './pages/items/items-details/items-details.component';
import { ItemsEditComponent } from './pages/items/items-edit/items-edit.component';
import { ItemsListComponent } from './pages/items/items-list/items-list.component';
import { ItemunitsCreateComponent } from './pages/itemunits/itemunits-create/itemunits-create.component';
import { ItemunitsEditComponent } from './pages/itemunits/itemunits-edit/itemunits-edit.component';
import { ItemunitsListComponent } from './pages/itemunits/itemunits-list/itemunits-list.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersDetailsComponent } from './pages/orders/orders-details/orders-details.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { PaymentgatewayCreateComponent } from './pages/paymentgateway/paymentgateway-create/paymentgateway-create.component';
import { PaymentgatewayEditComponent } from './pages/paymentgateway/paymentgateway-edit/paymentgateway-edit.component';
import { PaymentgatewayListComponent } from './pages/paymentgateway/paymentgateway-list/paymentgateway-list.component';
import { PractitionercatCreateComponent } from './pages/practitionercat/practitionercat-create/practitionercat-create.component';
import { PractitionercatEditComponent } from './pages/practitionercat/practitionercat-edit/practitionercat-edit.component';
import { PractitionercatListComponent } from './pages/practitionercat/practitionercat-list/practitionercat-list.component';
import { PractitionergroupCreateComponent } from './pages/practitionergroup/practitionergroup-create/practitionergroup-create.component';
import { PractitionergroupDetailsComponent } from './pages/practitionergroup/practitionergroup-details/practitionergroup-details.component';
import { PractitionergroupEditComponent } from './pages/practitionergroup/practitionergroup-edit/practitionergroup-edit.component';
import { PractitionergroupListComponent } from './pages/practitionergroup/practitionergroup-list/practitionergroup-list.component';
import { PractitionersCreateComponent } from './pages/practitioners/practitioners-create/practitioners-create.component';
import { PractitionersDetailsComponent } from './pages/practitioners/practitioners-details/practitioners-details.component';
import { PractitionersEditComponent } from './pages/practitioners/practitioners-edit/practitioners-edit.component';
import { PractitionersListComponent } from './pages/practitioners/practitioners-list/practitioners-list.component';
import { ResetpwdComponent } from './pages/resetpwd/resetpwd.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { StateCreateComponent } from './pages/state/state-create/state-create.component';
import { StateEditComponent } from './pages/state/state-edit/state-edit.component';
import { StateListComponent } from './pages/state/state-list/state-list.component';
import { SubcategoriesCreateComponent } from './pages/subcategories/subcategories-create/subcategories-create.component';
import { SubcategoriesEditComponent } from './pages/subcategories/subcategories-edit/subcategories-edit.component';
import { SubcategoriesListComponent } from './pages/subcategories/subcategories-list/subcategories-list.component';
import { TemplateCreateComponent } from './pages/template/template-create/template-create.component';
import { TemplateEditComponent } from './pages/template/template-edit/template-edit.component';
import { TemplateListComponent } from './pages/template/template-list/template-list.component';
import { WabpagesComponent } from './pages/wabpages/wabpages.component';
import { PatientsorderComponent } from './pages/practitioners/patientsorder/patientsorder.component';
import { SmstemplateListComponent } from './pages/smstempalte/smstemplate-list/smstemplate-list.component';
import { SmstemplateCreateComponent } from './pages/smstempalte/smstemplate-create/smstemplate-create.component';
import { SmstemplateEditComponent } from './pages/smstempalte/smstemplate-edit/smstemplate-edit.component';
import { ProductreviewListComponent } from './pages/productreview/productreview-list/productreview-list.component';
import { ProductreviewCreateComponent } from './pages/productreview/productreview-create/productreview-create.component';
import { PaymentmanagementListComponent } from './pages/paymentmanagement/paymentmanagement-list/paymentmanagement-list.component';
import { PayoutdetailComponent } from './pages/paymentmanagement/payoutdetail/payoutdetail.component';
import { GetinquiryComponent } from './pages/getinquiry/getinquiry.component';
import { PatientComponent } from './pages/patient/patient.component';
import { SalesreportComponent } from './pages/reports/salesreport/salesreport.component';
import { InventoryListComponent } from './pages/inventory/inventory-list/inventory-list.component';
import { InventoryCreateComponent } from './pages/inventory/inventory-create/inventory-create.component';
import { InventoryDetailsComponent } from './pages/inventory-details/inventory-details.component';
import { ProductsalereportComponent } from './pages/reports/productsalereport/productsalereport.component';
import { ProductreviewEditComponent } from './pages/productreview/productreview-edit/productreview-edit.component';
import { BlogListComponent } from './pages/blog/blog-list/blog-list.component';
import { BlogCreateComponent } from './pages/blog/blog-create/blog-create.component';
import { BlogEditComponent } from './pages/blog/blog-edit/blog-edit.component';
import { ModuleListComponent } from './pages/module/module-list/module-list.component';
import { ModuleCreateComponent } from './pages/module/module-create/module-create.component';
import { ModuleEditComponent } from './pages/module/module-edit/module-edit.component';
import { LessonListComponent } from './pages/lesson/lesson-list/lesson-list.component';
import { LessonCreateComponent } from './pages/lesson/lesson-create/lesson-create.component';
import { LessonEditComponent } from './pages/lesson/lesson-edit/lesson-edit.component';
import { LessonmoduleComponent } from './pages/lesson/lessonmodule/lessonmodule.component';
import { CourseListComponent } from './pages/items/course-list/course-list.component';
import { CourseDetailsComponent } from './pages/items/course-details/course-details.component';
import { OrdersummaryreportComponent } from './pages/reports/ordersummaryreport/ordersummaryreport.component';
import { PatientDetailsComponent } from './pages/patient/patient-details/patient-details.component';
import { DivplistComponent } from './pages/div/divplist/divplist.component';
import { InitiatedorderComponent } from './pages/orders/initiatedorder/initiatedorder.component';

const routes: Routes = [
  { path: environment.home,component:HomeComponent, canActivate:[AuthGuard], title:'Dashboard'},
  { path: '', component:LoginComponent,data: { showHeader: false, showSidebar: false,showFooter:false }},
  { path: environment.login, component:LoginComponent, data: { showHeader: false, showSidebar: false,showFooter:false } ,title:'Vita One'},
  { path: environment.forgotPassword, component:ForgotpwdComponent, data: { showHeader: false, showSidebar: false,showFooter:false }},
  { path: environment.resetPassword, component:ResetpwdComponent, data: { showHeader: false, showSidebar: false,showFooter:false }},
  
  { path: environment.categoriesList, canActivate:[AuthGuard], component:CategoriesListComponent,title:'Categories'},
  { path: environment.categoriesCreate, canActivate:[AuthGuard], component:CategoriesCreateComponent,title:'Create Category'},
  { path: environment.categoriesEdit+"/:id", canActivate:[AuthGuard], component:CategoriesEditComponent,title:'Edit Category'},
  
  { path: environment.subcategoriesList, canActivate:[AuthGuard], component:SubcategoriesListComponent,title:'Sub Categories'},
  { path: environment.subcategoriesCreate, canActivate:[AuthGuard], component:SubcategoriesCreateComponent,title:'Create Sub Category'},
  { path: environment.subcategoriesEdit+"/:id", canActivate:[AuthGuard], component:SubcategoriesEditComponent,title:'Edit Sub Category'},
  
  { path: environment.itemunitsList, canActivate:[AuthGuard], component:ItemunitsListComponent,title:'Item Units'},
  { path: environment.itemunitsCreate, canActivate:[AuthGuard], component:ItemunitsCreateComponent,title:'Create Item Unit'},
  { path: environment.itemunitsEdit+"/:id", canActivate:[AuthGuard], component:ItemunitsEditComponent,title:'Edit Item Unit'},
  
  { path: environment.practitionercategoriesList, canActivate:[AuthGuard], component:PractitionercatListComponent,title:'Practitioner Categories'},
  { path: environment.practitionercategoriesCreate, canActivate:[AuthGuard], component:PractitionercatCreateComponent,title:'Create Practitioner Category'},
  { path: environment.practitionercategoriesEdit+"/:id", canActivate:[AuthGuard], component:PractitionercatEditComponent,title:'Edit Practitioner Category'},
  
  { path: environment.practitionergroupList, canActivate:[AuthGuard], component:PractitionergroupListComponent,title:'Practitioner Group'},
  { path: environment.practitionergroupCreate, canActivate:[AuthGuard], component:PractitionergroupCreateComponent,title:'Create Practitioner Group'},
  { path: environment.practitionergroupEdit+"/:id", canActivate:[AuthGuard], component:PractitionergroupEditComponent,title:'Edit Practitioner Group'},
  { path: environment.practitionergroupDetails+"/:id", canActivate:[AuthGuard], component:PractitionergroupDetailsComponent,title:'Detail Practitioner Group'},
  
  { path: environment.practitionersList, canActivate:[AuthGuard], component:PractitionersListComponent,title:'Practitioners'},
  { path: environment.practitionersCreate, canActivate:[AuthGuard], component:PractitionersCreateComponent,title:'Create Practitioner'},
  { path: environment.practitionersEdit+"/:id", canActivate:[AuthGuard], component:PractitionersEditComponent,title:'Edit Practitioner'},
  { path: environment.practitionersDetails+"/:id", canActivate:[AuthGuard], component:PractitionersDetailsComponent,title:'Detail Practitioner'},
  { path: environment.patientsDetails+"/:id", canActivate:[AuthGuard], component:PatientsorderComponent,title:'Detail Patients'},

  { path: environment.patientList, canActivate:[AuthGuard], component:PatientComponent,title:'Patients'},
  { path: environment.patientDetails+"/:id", canActivate:[AuthGuard], component:PatientDetailsComponent,title:'Detail Patient'},
  
  { path: environment.itemsList, canActivate:[AuthGuard], component:ItemsListComponent,title:'Items'},
  { path: environment.itemsCreate, canActivate:[AuthGuard], component:ItemsCreateComponent,title:'Create Item'},
  { path: environment.itemsEdit+"/:id", canActivate:[AuthGuard], component:ItemsEditComponent,title:'Edit Item'},
  { path: environment.itemsDetails+"/:id", canActivate:[AuthGuard], component:ItemsDetailsComponent,title:'Detail Item'},

  { path: environment.courseList, canActivate:[AuthGuard], component:CourseListComponent,title:'Course'},
  { path: environment.courseDetails+"/:id", canActivate:[AuthGuard], component:CourseDetailsComponent,title:'Detail Course'},

  { path: environment.courierList, canActivate:[AuthGuard], component:CouriercompanyListComponent,title:'Courier Companies'},
  { path: environment.courierCreate, canActivate:[AuthGuard], component:CouriercompanyCreateComponent,title:'Create Courier Company'},
  { path: environment.courierEdit+"/:id", canActivate:[AuthGuard], component:CouriercompanyEditComponent,title:'Edit Courier Company'},

  { path: environment.couponList, canActivate:[AuthGuard], component:CouponmanagementListComponent,title:'Coupon'},
  { path: environment.couponCreate, canActivate:[AuthGuard], component:CouponmanagementCreateComponent,title:'Create Coupon'},
  { path: environment.couponEdit+"/:id", canActivate:[AuthGuard], component:CouponmanagementEditComponent,title:'Edit Coupon'},

  { path: environment.paymentgatewayList, canActivate:[AuthGuard], component:PaymentgatewayListComponent,title:'Payment Gateway'},
  { path: environment.paymentgatewayCreate, canActivate:[AuthGuard], component:PaymentgatewayCreateComponent,title:'Create Payment Gateway'},
  { path: environment.paymentgatewayEdit+"/:id", canActivate:[AuthGuard], component:PaymentgatewayEditComponent,title:'Edit Payment Gateway'},

  { path: environment.paymentmanagementList, canActivate:[AuthGuard], component:PaymentmanagementListComponent,title:'Remuneration'},
  { path: environment.payoutDetails+"/:id", canActivate:[AuthGuard], component:PayoutdetailComponent,title:'Payout'},

  { path: environment.countryList, canActivate:[AuthGuard], component:CountryListComponent,title:'Country'},
  { path: environment.countryCreate, canActivate:[AuthGuard], component:CountryCreateComponent,title:'Create Country'},
  { path: environment.countryEdit+"/:id", canActivate:[AuthGuard], component:CountryEditComponent,title:'Edit Country'},

  { path: environment.stateList, canActivate:[AuthGuard], component:StateListComponent,title:'State'},
  { path: environment.stateCreate, canActivate:[AuthGuard], component:StateCreateComponent,title:'Create State'},
  { path: environment.stateEdit+"/:id", canActivate:[AuthGuard], component:StateEditComponent,title:'Edit State'},
  
  { path: environment.cityList, canActivate:[AuthGuard], component:CityListComponent,title:'City'},
  { path: environment.cityCreate, canActivate:[AuthGuard], component:CityCreateComponent,title:'Create City'},
  { path: environment.cityEdit+"/:id", canActivate:[AuthGuard], component:CityEditComponent,title:'Edit City'},

  { path: environment.dosesList, canActivate:[AuthGuard], component:DosesListComponent,title:'Doses'},
  { path: environment.dosesCreate, canActivate:[AuthGuard], component:DosesCreateComponent,title:'Create Dose'},
  { path: environment.dosesEdit+"/:id", canActivate:[AuthGuard], component:DosesEditComponent,title:'Edit Dose'},

  { path: environment.templateList, canActivate:[AuthGuard], component:TemplateListComponent,title:'Protocol'},
  { path: environment.templateCreate, canActivate:[AuthGuard], component:TemplateCreateComponent,title:'Create Protocol'},
  { path: environment.templateEdit+"/:id", canActivate:[AuthGuard], component:TemplateEditComponent,title:'Edit Protocol'},

  { path: environment.initiatedOrderList, canActivate:[AuthGuard], component:InitiatedorderComponent,title:'Initiated Orders list'},
  { path: environment.ordersList, canActivate:[AuthGuard], component:OrdersListComponent,title:'Orders list'},
  { path: environment.ordersDetails+"/:id", canActivate:[AuthGuard], component:OrdersDetailsComponent,title:'Order Detail'},

  { path: environment.smsTemplateList, canActivate:[AuthGuard], component:SmstemplateListComponent,title:'SMS Template'},
  { path: environment.smsTemplateCreate, canActivate:[AuthGuard], component:SmstemplateCreateComponent,title:'Create SMS Template'},
  { path: environment.smsTemplateEdit +"/:id", canActivate:[AuthGuard], component:SmstemplateEditComponent,title:'Edit SMS Template'},

  { path: environment.productReviewList, canActivate:[AuthGuard], component:ProductreviewListComponent,title:'Product Review'},
  { path: environment.productReviewCreate, canActivate:[AuthGuard], component:ProductreviewCreateComponent,title:'Create Product Review'},
  { path: environment.productReviewEdit +"/:id", canActivate:[AuthGuard], component:ProductreviewEditComponent,title:'Edit Product Review'},
  
  { path: environment.inquiry,canActivate:[AuthGuard],component:GetinquiryComponent,title:"Contact Inquiry"},
  
  { path: environment.webPages,canActivate:[AuthGuard],component:WabpagesComponent,title:"Webpages"},
  
  { path: environment.settings,canActivate:[AuthGuard],component:SettingsComponent,title:"Settings"},

  { path: environment.salesReportList,canActivate:[AuthGuard],component:SalesreportComponent,title:"Sales Report"},
  { path: environment.productsalesReportList,canActivate:[AuthGuard],component:ProductsalereportComponent,title:"Product Sales Report"},
  { path: environment.orderSummaryReportList,canActivate:[AuthGuard],component:OrdersummaryreportComponent,title:"Order Summary Report"},

  { path: environment.inventoryList, canActivate:[AuthGuard], component:InventoryListComponent,title:'Inventory'},
  { path: environment.inventoryCreate, canActivate:[AuthGuard], component:InventoryCreateComponent,title:'Create Inventory'},
  { path: environment.inventoryDetails+"/:id", canActivate:[AuthGuard], component:InventoryDetailsComponent,title:'Detail Inventory'},

  { path: environment.blogList, canActivate:[AuthGuard], component:BlogListComponent,title:'Blog'},
  { path: environment.blogCreate, canActivate:[AuthGuard], component:BlogCreateComponent,title:'Create Blog'},
  { path: environment.blogEdit +"/:id", canActivate:[AuthGuard], component:BlogEditComponent,title:'Edit Blog'},

  { path: environment.moduleList, canActivate:[AuthGuard], component:ModuleListComponent,title:'Module'},
  { path: environment.moduleCreate, canActivate:[AuthGuard], component:ModuleCreateComponent,title:'Create Module'},
  { path: environment.moduleEdit +"/:id", canActivate:[AuthGuard], component:ModuleEditComponent,title:'Edit Module'},

  { path: environment.lessonList, canActivate:[AuthGuard], component:LessonListComponent,title:'Lesson'},
  { path: environment.lessonCreate, canActivate:[AuthGuard], component:LessonCreateComponent,title:'Create Lesson'},
  { path: environment.lessonEdit +"/:id", canActivate:[AuthGuard], component:LessonEditComponent,title:'Edit Lesson'},

  { path: environment.lessonmodule+"/:id", canActivate:[AuthGuard], component:LessonmoduleComponent,title:'Create Lesson_Module'},
  { path: environment.divplist, canActivate:[AuthGuard], component:DivplistComponent,title:'list'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration:'top'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
