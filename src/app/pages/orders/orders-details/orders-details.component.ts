import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { CouriercompanyService } from 'src/app/services/couriercompany.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent {

  ordersListurl ="/" + environment.ordersList

  //(Id = order id)
  Id: any;
  loading = false;
  orderNo:any;
  ordDetails:any;
  orditem:any;
  imageUrl = environment.cdnUrl + 'Product';
  discountAmount =0;
  additionalDiscountAmount =0
  deliveryCharge =0; 
  totalprice:any;
  ttprice =0;
  qty:any
  currency:any
  shortName:any;
  orderStatusDD:any = [{"Name":"Order Initiated"},{"Name":"Pending"},{"Name":"Processing"},{"Name":"Dispatch"},{"Name":"Delivered"},{"Name":"Rejected"},{"Name":"Cancel"}];
  status:any;
  orderpymtStatusDD:any = [{"Name":"Pending"},{"Name":"Received"},{"Name":"Refund"},{"Name":"Cancel"}];
  orderpymtGatewayDD:any = [{"Name":"Order Created"},{"Name":"authorized"},{"Name":"captured"},{"Name":"refunded"},{"Name":"failed"}];
  
  paymentStatus:any;
  paymentGatewayStatus:any;
  payStatus:any;
  ormStatus:any;
  statusloading:any  
  remark:any;
  response:any
  mes:any
  courierlist:any
  courierlistloading:any
  @Input() Isshowselectbox = true; 
  courierdropdownMessage:any
  DocketNoMessage:any
  TrackingUrlMessage:any
  
  constructor(
   public courierService:CouriercompanyService,  
   public ordersservice:OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr:ToastrService
  ) {
    this.getordDetail(this.route.snapshot.params['id']);
    this.orderdetailtranstion(this.route.snapshot.params['id']);
    this.courierList();
  }

  odiCompanyId:any
  odiTrackingUrl:any
  odiDocketNo:any
  odiRemark:any
  //Company
  onchange(event:any) {
    const d =event.target.value.toString()
    let da = d.split(',')
    this.odiCompanyId = da[0]
    this.odiTrackingUrl =da[1] 
  }

   //get the list from State actvie
   private courierList() {
    this.courierlist = null;
    this.courierService.listActiveCourier().subscribe({
      next: (data) => {                  
        this.courierlist = data;          
      },
     // error: (e) => console.log(e),
    });
  }
  
  /*dropdown*/
  ordstatusDD(event:any){
    this.status=event.target.value;
  }
  
  /*dropdown*/
  pymtstatusDD(event:any){
    this.paymentStatus=event.target.value;
  }
  
  pymtstatusgatewayDD(event:any){
    this.paymentGatewayStatus=event.target.value;
  }
  
  // get the record particular Patients order Detail
  getordDetail(id: any) {
    this.loading = true
    this.Id = id;
    this.ordersservice.getOrders(id).subscribe({
      next: (data: any) => {
        this.shortName = data.name.substring(0,1);
        this.ordDetails = data
        this.ormStatus =data.status
        this.paymentStatus = data.paymentStatus
        this.paymentGatewayStatus = data.paymentGatewayStatus
        this.status = data.status
        this.remark = data.remark
        this.currency=data.currency
        this.qty = data.orderItems.length
        this.orderNo= data.orderNo
        this.totalprice =data.totalPrice
        this.orditem = data.orderItems
        this.ttprice = parseInt(data.totalPrice)
        this.deliveryCharge = parseInt(data.ormDeliveryCharge??0)
        this.discountAmount = parseFloat(data.discountAmount??0)  
        this.additionalDiscountAmount = parseFloat(data.additionalDiscountAmount??0)
        if(data.orderDispatchInformation != null){
          this.odiDocketNo =  data.orderDispatchInformation.odiDocketNo 
          this.odiTrackingUrl = data.orderDispatchInformation.odiTrackingUrl
          this.odiRemark = data.orderDispatchInformation.odiRemark
          this.odiCompanyId = data.orderDispatchInformation.odiCompany
        }
        this.loading = false
      },
    });
  }
  
  errorCount = 0;
  //update order  for Status
  onSubmit(form: NgForm) { 
    this.errorCount = 0;           
    this.ordersservice.ordStatus.orderId =this.Id
    this.ordersservice.ordStatus.adminId = localStorage.getItem('userId');
    
    if(this.status == undefined){
      this.ordersservice.ordStatus.orderStatus = "Order Initiated";
    }else{
      this.ordersservice.ordStatus.orderStatus = this.status;
    }
    if(this.paymentStatus == undefined){
      this.ordersservice.ordStatus.paymentStatus = "Pending"; 
    }else{
      this.ordersservice.ordStatus.paymentStatus = this.paymentStatus; 
    }
    if(this.paymentStatus == undefined){
      this.ordersservice.ordStatus.razorPayStatus="Order Created";
    }
    else{
      this.ordersservice.ordStatus.razorPayStatus=this.paymentGatewayStatus
    }
    
    
    if(this.remark == undefined){
      this.ordersservice.ordStatus.orderRemark = "-"
    }else{
      this.ordersservice.ordStatus.orderRemark = this.remark
    } 


     //start Order Dispatch service
    if(this.status == 'Dispatch'){  
      
      this.errorCount = 0;          
      
      //courier company dropdown validation
     if (this.odiCompanyId == '-' || this.odiCompanyId == undefined) {
      this.errorCount++;
      this.courierdropdownMessage = 'Please select courier company';
    } else {
      this.courierdropdownMessage = '';
    }
     //DocketNo validation
     if (this.odiDocketNo == '-' || this.odiDocketNo == undefined ||this.odiDocketNo == null) {
      this.errorCount++;
      this.DocketNoMessage = 'Please enter docket no ';
    } else {
      this.DocketNoMessage = '';
    }    
    //DocketNo validation
    if (this.odiTrackingUrl == '-' || this.odiTrackingUrl == undefined ||this.odiTrackingUrl == null) {
      this.errorCount++;
      this.TrackingUrlMessage = 'Please enter tracking url ';
    } else {
      this.TrackingUrlMessage = '';
    }
    
    
      if (this.errorCount == 0) {
        this.statusloading = true;
      this.ordersservice.ordDispatch.orderId =this.Id
      this.ordersservice.ordDispatch.adminId = localStorage.getItem('userId');      
      this.ordersservice.ordDispatch.odiCompany = this.odiCompanyId
      this.ordersservice.ordDispatch.odiTrackingUrl = this.odiTrackingUrl
      this.ordersservice.ordDispatch.odiDocketNo = this.odiDocketNo
      this.ordersservice.ordDispatch.odiRemark = this.odiRemark
      this.ordersservice.ordDispatch.paymentStatus = this.paymentStatus
      this.ordersservice.ordDispatch.razorPayStatus=this.paymentGatewayStatus;
      this.ordersservice.orderDispatch().subscribe((res: any)=>{
        this.response = res;            
            if (this.response != 'Success') {
              this.mes = this.response;
              this.statusloading = false;
            } else {
              this.statusloading = false;    
                     
              this.toastr.success("Order status update successfully !")
             // this.status = ""
              this.getordDetail(this.route.snapshot.params['id']);
              
            }
      });
    }
    }   
    else{
      //start Order update service
      if(this.errorCount == 0){
        this.statusloading = true;
        this.ordersservice.orderStatusupdate().subscribe((res: any) => {
            this.response = res;            
            if (this.response != 'Success') {
              this.mes = this.response;
              this.statusloading = false;
            } else {
              this.statusloading = false;    
                     
              this.toastr.success("Order status update successfully !")
             // this.status = ""
              this.getordDetail(this.route.snapshot.params['id']);
              
            }
          });
        }
    }
      
  }

  trnlist:any
   //get the list order detail transtion
   private orderdetailtranstion(id:any) {
    this.trnlist = null;
    this.ordersservice.getOrderstrnstion(id).subscribe({
      next: (data) => {                        
        this.trnlist = data;              
      },
     // error: (e) => console.log(e),
    });
  }

  /******************start edit patient address *********************************** */

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

  addloading = false
  camAddress1:any; 
  camName:any; 
  camPhone:any; 
  camType :any;

  camnameMessage: any;
  camphoneMessage: any;
  camaddress1Message: any;

  setType(type:any){    
    this.ordersservice.patAdd.type=type;
    if(type=="Billing")
    {
      this.camName=this.ordDetails.billingAddress.split("||")[0].split("|")[0]
      this.camPhone=parseInt(this.ordDetails.billingAddress.split("||")[0].split("|")[1])
      this.camAddress1=this.ordDetails.billingAddress.split("||")[1]
    }
    else{
      this.camName=this.ordDetails.shippingAddress.split("||")[0].split("|")[0]
      this.camPhone=parseInt(this.ordDetails.shippingAddress.split("||")[0].split("|")[1])
      this.camAddress1=this.ordDetails.shippingAddress.split("||")[1]
    }
  }

  patientaddEdit() {
    this.errorCount = 0;
    this.camaddress1Message='';
    this.camnameMessage='';
    this.camaddress1Message = '';
    
    //Name Validation    
    if (this.camName == undefined) {
      this.errorCount++;
      this.camnameMessage = 'Please enter name';
    } else {
      if (this.camName.trim() == '') {
        this.errorCount++;
        this.camnameMessage = 'Please enter valid name';
      } else {
        this.camnameMessage = '';
      }
    }
    
    //Mobile Validation
    if (this.camPhone == undefined) {
      this.errorCount++;
      this.camphoneMessage = 'Please enter mobile number';
    } else {
      if (this.camPhone.length == 0) {
        this.errorCount++;
        this.camphoneMessage = 'Please enter valid mobile number';
      } else {
        var isNumber = this.containsOnlyNumbers(this.camPhone);
        if (isNumber == true) {
          var validateMobile = this.validateMobile(this.camPhone);
          if (validateMobile == false) {
            this.errorCount++;
            this.camphoneMessage = 'Please enter valid mobile number';
          } else {
            this.camphoneMessage = '';
          }
        } else {
          this.camphoneMessage = '';
        }
      }
    }
    
    //Address1 Validation
    if (this.camAddress1 == undefined) {
      this.errorCount++;
      this.camaddress1Message = 'Please enter Address';
    } else {
      if (this.camAddress1.trim() == '') {
        this.errorCount++;
        this.camaddress1Message = 'Please enter valid Address';
      } else {
        this.camaddress1Message = '';
      }
    }
    
    if (this.errorCount == 0) {
      if (this.addloading == false) {
        this.addloading = true;
        //start AddAddress service
        this.ordersservice.patAdd.id = this.Id;
        this.ordersservice.patAdd.address = this.camName +" | "+ this.camPhone + "||"+this.camAddress1;
        this.ordersservice.editAddres().subscribe((res) => {
          this.response = res;
          this.addloading = true;
          this.getordDetail(this.route.snapshot.params['id']);
        });
      }
    }
  }
  
  //Pdf Download
  pdfloading=false;
  pdf(){
    this.pdfloading = true
    this.ordersservice.pdfDownload(this.Id).subscribe((res: any) => {
      if (res.type != 'text/plain') {
        var blob = new Blob([res]);
        let file = "Invoice.pdf";
        FileSaver.saveAs(blob, file);
        this.pdfloading = false;
      }
    });
  }
 
}
