import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoComponent } from './components/logo/logo.component';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { environment } from 'src/environments/environments';
import { FloatinginputcontrolComponent } from './components/floatinginputcontrol/floatinginputcontrol.component';
import { AccountbuttoncomponentComponent } from './components/accountbuttoncomponent/accountbuttoncomponent.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ForgotpwdComponent } from './pages/forgotpwd/forgotpwd.component';
import { ButtoncontrolconcomponentComponent } from './components/buttoncontrolconcomponent/buttoncontrolconcomponent.component';
import { ResetpwdComponent } from './pages/resetpwd/resetpwd.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesCreateComponent } from './pages/categories/categories-create/categories-create.component';
import { CategoriesEditComponent } from './pages/categories/categories-edit/categories-edit.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CreateiconComponent } from './components/createicon/createicon.component';
import { InputcontrolComponent } from './components/inputcontrol/inputcontrol.component';
import { PagetitleComponent } from './components/pagetitle/pagetitle.component';
import { CategoryblockComponent } from './components/categoryblock/categoryblock.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DatanotfoundComponent } from './components/datanotfound/datanotfound.component';
import { ToggleswitchcontrolComponent } from './components/toggleswitchcontrol/toggleswitchcontrol.component';
import { SubcategoriesListComponent } from './pages/subcategories/subcategories-list/subcategories-list.component';
import { SubcategoriesCreateComponent } from './pages/subcategories/subcategories-create/subcategories-create.component';
import { SubcategoriesEditComponent } from './pages/subcategories/subcategories-edit/subcategories-edit.component';
import { CataloguedropdowncontrolconcomponentComponent } from './components/cataloguedropdowncontrolconcomponent/cataloguedropdowncontrolconcomponent.component';
import { TableComponent } from './components/table/table.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { SubcatloaderComponent } from './components/loaders/subcatloader/subcatloader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ItemunitsListComponent } from './pages/itemunits/itemunits-list/itemunits-list.component';
import { ItemunitsCreateComponent } from './pages/itemunits/itemunits-create/itemunits-create.component';
import { ItemunitsEditComponent } from './pages/itemunits/itemunits-edit/itemunits-edit.component';
import { PractitionercatListComponent } from './pages/practitionercat/practitionercat-list/practitionercat-list.component';
import { PractitionercatCreateComponent } from './pages/practitionercat/practitionercat-create/practitionercat-create.component';
import { PractitionercatEditComponent } from './pages/practitionercat/practitionercat-edit/practitionercat-edit.component';
import { PractitionergroupListComponent } from './pages/practitionergroup/practitionergroup-list/practitionergroup-list.component';
import { PractitionergroupCreateComponent } from './pages/practitionergroup/practitionergroup-create/practitionergroup-create.component';
import { PractitionergroupEditComponent } from './pages/practitionergroup/practitionergroup-edit/practitionergroup-edit.component';
import { PractitionergroupDetailsComponent } from './pages/practitionergroup/practitionergroup-details/practitionergroup-details.component';
import { ItemsListComponent } from './pages/items/items-list/items-list.component';
import { ItemsCreateComponent } from './pages/items/items-create/items-create.component';
import { ItemsEditComponent } from './pages/items/items-edit/items-edit.component';
import { ItemsDetailsComponent } from './pages/items/items-details/items-details.component';
import { InputdropdowncomponentComponent } from './components/inputdropdowncomponent/inputdropdowncomponent.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HtmleditorcontrolcomponentComponent } from './components/htmleditorcontrolcomponent/htmleditorcontrolcomponent.component';
import { LabelcontrolconcomponentComponent } from './components/labelcontrolconcomponent/labelcontrolconcomponent.component';
import { TextareacontrolcontrolcomponentComponent } from './components/textareacontrolcontrolcomponent/textareacontrolcontrolcomponent.component';
import { UploadcontrolconcomponentComponent } from './components/uploadcontrolconcomponent/uploadcontrolconcomponent.component';
import { ItemlistComponent } from './components/itemlist/itemlist.component';
import { SearchdropdownconcomponentComponent } from './components/searchdropdownconcomponent/searchdropdownconcomponent.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StateListComponent } from './pages/state/state-list/state-list.component';
import { StateCreateComponent } from './pages/state/state-create/state-create.component';
import { StateEditComponent } from './pages/state/state-edit/state-edit.component';
import { StateloaderComponent } from './components/loaders/stateloader/stateloader.component';
import { CityloaderComponent } from './components/loaders/cityloader/cityloader.component';
import { CityListComponent } from './pages/city/city-list/city-list.component';
import { CityCreateComponent } from './pages/city/city-create/city-create.component';
import { CityEditComponent } from './pages/city/city-edit/city-edit.component';
import { PractitionersListComponent } from './pages/practitioners/practitioners-list/practitioners-list.component';
import { PractitionersCreateComponent } from './pages/practitioners/practitioners-create/practitioners-create.component';
import { PractitionersEditComponent } from './pages/practitioners/practitioners-edit/practitioners-edit.component';
import { PractitionersDetailsComponent } from './pages/practitioners/practitioners-details/practitioners-details.component';
import { PraGrouplistloaderComponent } from './components/loaders/pra-grouplistloader/pra-grouplistloader.component';
import { CouriercompanyListComponent } from './pages/couriercompany/couriercompany-list/couriercompany-list.component';
import { CouriercompanyCreateComponent } from './pages/couriercompany/couriercompany-create/couriercompany-create.component';
import { CouriercompanyEditComponent } from './pages/couriercompany/couriercompany-edit/couriercompany-edit.component';
import { CourierlistloaderComponent } from './components/loaders/courierlistloader/courierlistloader.component';
import { PrdDiscountDetailloaderComponent } from './components/loaders/prd-discount-detailloader/prd-discount-detailloader.component';
import { AuthGuard } from './auth.guard';
import { PractitionersloaderComponent } from './components/loaders/practitionersloader/practitionersloader.component';
import { ItemslistloaderComponent } from './components/loaders/itemslistloader/itemslistloader.component';
import { CategorylistloaderComponent } from './components/loaders/categorylistloader/categorylistloader.component';
import { PaymentgatewayListComponent } from './pages/paymentgateway/paymentgateway-list/paymentgateway-list.component';
import { PaymentgatewayCreateComponent } from './pages/paymentgateway/paymentgateway-create/paymentgateway-create.component';
import { PaymentgatewayEditComponent } from './pages/paymentgateway/paymentgateway-edit/paymentgateway-edit.component';
import { PaymentgatewaylistloaderComponent } from './components/loaders/paymentgatewaylistloader/paymentgatewaylistloader.component';
import { CouponmanagementListComponent } from './pages/couponmanagement/couponmanagement-list/couponmanagement-list.component';
import { CouponmanagementCreateComponent } from './pages/couponmanagement/couponmanagement-create/couponmanagement-create.component';
import { CouponmanagementEditComponent } from './pages/couponmanagement/couponmanagement-edit/couponmanagement-edit.component';
import { CouponlistloaderComponent } from './components/loaders/couponlistloader/couponlistloader.component';
import { ItemsdetailloaderComponent } from './components/loaders/itemsdetailloader/itemsdetailloader.component';
import { PrdGrpdetailloaderComponent } from './components/loaders/prd-grpdetailloader/prd-grpdetailloader.component';
import { PractitionerDetailsloaderComponent } from './components/loaders/practitioner-detailsloader/practitioner-detailsloader.component';
import { DosesListComponent } from './pages/doses/doses-list/doses-list.component';
import { DosesCreateComponent } from './pages/doses/doses-create/doses-create.component';
import { DosesEditComponent } from './pages/doses/doses-edit/doses-edit.component';
import { TemplateListComponent } from './pages/template/template-list/template-list.component';
import { TemplateCreateComponent } from './pages/template/template-create/template-create.component';
import { TemplateEditComponent } from './pages/template/template-edit/template-edit.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ItemDDcomponentComponent } from './components/item-ddcomponent/item-ddcomponent.component';
import { WabpagesComponent } from './pages/wabpages/wabpages.component';
import { ToastrModule } from 'ngx-toastr';
import { TemplateloaderComponent } from './components/loaders/templateloader/templateloader.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CountryListComponent } from './pages/country/country-list/country-list.component';
import { CountryCreateComponent } from './pages/country/country-create/country-create.component';
import { CountryEditComponent } from './pages/country/country-edit/country-edit.component';
import { CountryloaderComponent } from './components/loaders/countryloader/countryloader.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailsComponent } from './pages/orders/orders-details/orders-details.component';
import { TrimPipe } from './pages/orders/orders-list/trim.pipe';
import { OrderdetailsloaderComponent } from './components/loaders/orderdetailsloader/orderdetailsloader.component';
import { OrderlistloaderComponent } from './components/loaders/orderlistloader/orderlistloader.component';
import { PatientsorderComponent } from './pages/practitioners/patientsorder/patientsorder.component';
import { PatientsloaderComponent } from './components/loaders/patientsloader/patientsloader.component';
import { SmstemplateCreateComponent } from './pages/smstempalte/smstemplate-create/smstemplate-create.component';
import { SmstemplateListComponent } from './pages/smstempalte/smstemplate-list/smstemplate-list.component';
import { SmstemplateEditComponent } from './pages/smstempalte/smstemplate-edit/smstemplate-edit.component';
import { ProductreviewListComponent } from './pages/productreview/productreview-list/productreview-list.component';
import { ProductreviewCreateComponent } from './pages/productreview/productreview-create/productreview-create.component';
import { ProductreviewloadercomponentsComponent } from './components/productreviewloadercomponents/productreviewloadercomponents.component';
import { PaymentmanagementListComponent } from './pages/paymentmanagement/paymentmanagement-list/paymentmanagement-list.component';
import { PaymanagementloadercomponentsComponent } from './components/loaders/paymanagementloadercomponents/paymanagementloadercomponents.component';
import { PayoutdetailComponent } from './pages/paymentmanagement/payoutdetail/payoutdetail.component';
import { TransactionloadercomponentsComponent } from './components/loaders/transactionloadercomponents/transactionloadercomponents.component';
import { GetinquiryComponent } from './pages/getinquiry/getinquiry.component';
import { InquiryloadersComponent } from './components/loaders/inquiryloaders/inquiryloaders.component';
import { NgMagnizoomModule } from 'ng-magnizoom';
import { PatientComponent } from './pages/patient/patient.component';
import { PatientlistloaderComponent } from './components/loaders/patientlistloader/patientlistloader.component';
import { SalesreportComponent } from './pages/reports/salesreport/salesreport.component';
import { InventoryCreateComponent } from './pages/inventory/inventory-create/inventory-create.component';
import { InventoryListComponent } from './pages/inventory/inventory-list/inventory-list.component';
import { InventoryloaderComponent } from './components/loaders/inventoryloader/inventoryloader.component';
import { InventoryDetailsComponent } from './pages/inventory-details/inventory-details.component';
import { InventorydetailoaderComponent } from './components/loaders/inventorydetailoader/inventorydetailoader.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsalereportComponent } from './pages/reports/productsalereport/productsalereport.component';
import { PrdsalreportloaderComponent } from './components/loaders/prdsalreportloader/prdsalreportloader.component';
import { ProductreviewEditComponent } from './pages/productreview/productreview-edit/productreview-edit.component';
import { BlogListComponent } from './pages/blog/blog-list/blog-list.component';
import { BlogCreateComponent } from './pages/blog/blog-create/blog-create.component';
import { BlogEditComponent } from './pages/blog/blog-edit/blog-edit.component';
import { BlogloadersComponent } from './components/loaders/blogloaders/blogloaders.component';
import { SafeHtmlPipe } from './pages/items/items-details/safe-html';
import { ModuleListComponent } from './pages/module/module-list/module-list.component';
import { ModuleCreateComponent } from './pages/module/module-create/module-create.component';
import { ModuleEditComponent } from './pages/module/module-edit/module-edit.component';
import { ModuleloaderComponent } from './components/loaders/moduleloader/moduleloader.component';
import { LessonListComponent } from './pages/lesson/lesson-list/lesson-list.component';
import { LessonCreateComponent } from './pages/lesson/lesson-create/lesson-create.component';
import { LessonEditComponent } from './pages/lesson/lesson-edit/lesson-edit.component';
import { LessonmoduleComponent } from './pages/lesson/lessonmodule/lessonmodule.component';
import { CourseListComponent } from './pages/items/course-list/course-list.component';
import { CourseDetailsComponent } from './pages/items/course-details/course-details.component';
import { OrdersummaryreportComponent } from './pages/reports/ordersummaryreport/ordersummaryreport.component';
import { PatientDetailsComponent } from './pages/patient/patient-details/patient-details.component';
import { DivcomponentComponent } from './components/divcomponent/divcomponent.component';
import { DivplistComponent } from './pages/div/divplist/divplist.component';
import { InitiatedorderComponent } from './pages/orders/initiatedorder/initiatedorder.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    FloatinginputcontrolComponent,
    AccountbuttoncomponentComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    ForgotpwdComponent,
    ButtoncontrolconcomponentComponent,
    ResetpwdComponent,
    HomeComponent,
    CategoriesCreateComponent,
    CategoriesEditComponent,
    CategoriesListComponent,
    CreateiconComponent,
    InputcontrolComponent,
    PagetitleComponent,
    CategoryblockComponent,
    DatanotfoundComponent,
    ToggleswitchcontrolComponent,
    SubcategoriesListComponent,
    SubcategoriesCreateComponent,
    SubcategoriesEditComponent,
    CataloguedropdowncontrolconcomponentComponent,
    TableComponent,    
    SearchFilterPipe,
    SubcatloaderComponent, 
    ItemunitsListComponent, 
    ItemunitsCreateComponent, 
    ItemunitsEditComponent, 
    PractitionercatListComponent, 
    PractitionercatCreateComponent, 
    PractitionercatEditComponent, 
    PractitionergroupListComponent, 
    PractitionergroupCreateComponent, 
    PractitionergroupEditComponent, 
    PractitionergroupDetailsComponent,
    ItemsListComponent,
    ItemsCreateComponent, 
    ItemsEditComponent, 
    ItemsDetailsComponent, 
    InputdropdowncomponentComponent, 
    HtmleditorcontrolcomponentComponent, 
    LabelcontrolconcomponentComponent, 
    TextareacontrolcontrolcomponentComponent, 
    UploadcontrolconcomponentComponent, 
    ItemlistComponent, 
    SearchdropdownconcomponentComponent, StateListComponent, StateCreateComponent, StateEditComponent, StateloaderComponent, CityloaderComponent, CityListComponent, CityCreateComponent, CityEditComponent, PractitionersListComponent, PractitionersCreateComponent, PractitionersEditComponent, PractitionersDetailsComponent, PraGrouplistloaderComponent, CouriercompanyListComponent, CouriercompanyCreateComponent, CouriercompanyEditComponent, CourierlistloaderComponent, PrdDiscountDetailloaderComponent, PractitionersloaderComponent, ItemslistloaderComponent, CategorylistloaderComponent, PaymentgatewayListComponent, PaymentgatewayCreateComponent, PaymentgatewayEditComponent, PaymentgatewaylistloaderComponent, CouponmanagementListComponent, CouponmanagementCreateComponent, CouponmanagementEditComponent, CouponlistloaderComponent, ItemsdetailloaderComponent, PrdGrpdetailloaderComponent, PractitionerDetailsloaderComponent, DosesListComponent, DosesCreateComponent, DosesEditComponent, TemplateListComponent, TemplateCreateComponent, TemplateEditComponent, ItemDDcomponentComponent, WabpagesComponent, TemplateloaderComponent, SettingsComponent, CountryListComponent, CountryCreateComponent, CountryEditComponent, CountryloaderComponent, OrdersListComponent, OrdersDetailsComponent,
    TrimPipe,
    OrderdetailsloaderComponent,
    OrderlistloaderComponent,
    PatientsorderComponent,
    PatientsloaderComponent,
    SmstemplateCreateComponent,
    SmstemplateListComponent,
    SmstemplateEditComponent,
    ProductreviewListComponent,
    ProductreviewCreateComponent,
    ProductreviewloadercomponentsComponent,
    PaymentmanagementListComponent,
    PaymanagementloadercomponentsComponent,
    PayoutdetailComponent,
    TransactionloadercomponentsComponent,
    GetinquiryComponent,
    InquiryloadersComponent,
    PatientComponent,
    PatientlistloaderComponent,
    SalesreportComponent,
    InventoryCreateComponent,
    InventoryListComponent,
    InventoryloaderComponent,
    InventoryDetailsComponent,
    InventorydetailoaderComponent,
    ProductsalereportComponent,
    PrdsalreportloaderComponent,
    ProductreviewEditComponent,
    BlogListComponent,
    BlogCreateComponent,
    BlogEditComponent,
    BlogloadersComponent,
    SafeHtmlPipe,
    ModuleListComponent,
    ModuleCreateComponent,
    ModuleEditComponent,
    ModuleloaderComponent,
    LessonListComponent,
    LessonCreateComponent,
    LessonEditComponent,
    LessonmoduleComponent,
    CourseListComponent,
    CourseDetailsComponent,
    OrdersummaryreportComponent,
    PatientDetailsComponent,
    DivcomponentComponent,
    DivplistComponent,
    InitiatedorderComponent,
  ],
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    InfiniteScrollModule,
    NgxSkeletonLoaderModule,
    AngularEditorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ButtonModule,
    DropDownListModule,
    NgMagnizoomModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
