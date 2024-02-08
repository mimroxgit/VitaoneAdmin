import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PractitionergroupService } from 'src/app/services/practitionergroup.service';
import { environment } from 'src/environments/environments';


@Component({
  selector: 'app-practitionergroup-edit',
  templateUrl: './practitionergroup-edit.component.html',
  styleUrls: ['./practitionergroup-edit.component.css']
})
export class PractitionergroupEditComponent {

  practitionergrouplistUrl = "/" + environment.practitionergroupList

  pgmName:any;
  pgmDefaultDiscount:any;
  pgmIsActive :any;
  pgmIsDefault:any;
  IsAllselect :any;
  totalChecked=0;
  totalItems=0;
  
  itmCostPrice:any=[];  
  dispar:any=[];
  dispar1:any;
  ischeck:any=[];
  ischeckBox=true  
  disparamount:any=[];
  disparprice:any=[];
  
  Id:any;
  adminId: any;  

  loading = false;
  mes: any;
  response: any;
  pgmnameMessage: any; 
  pgmdisMessage:any;
  errorCount = 0;
  setvalue:any=[];
  itmactivelist:any;
  setmeprice:any;
  itemList:any;
  IsParticular:any=[];
  constructor(
    public practitionergroupService: PractitionergroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getpraGroup(this.route.snapshot.params['id']);
  }

  @Input() isdef = false;

  //Default Coupon Set
  Defaultcoupon(){

    if (this.isdef == true) {
      this.isdef = false;
      this.pgmIsDefaultCoupon = this.isdef;
    } else {
      this.isdef = true;
      this.pgmIsDefaultCoupon = this.isdef;
    }
  }

  //Custom Coupon set
  Customcoupon($event:any){
    if($event.target.checked==true){
      this.pgmIsCustomCoupon = true  
    }else{
      this.pgmIsCustomCoupon = false  
    }    
  }
  cpnType:any
  cpnValue:any;
  pgmIsDefaultCoupon:any;
  pgmIsCustomCoupon:any;
  couponList:any=[];
  
  /*dropdown*/
  platformDD(event:any){
    this.cpnType=event.target.value;
    
  }

  onDiscountApply(){
    if(this.cpnType=="-")
    {
      alert("Please select discount type");
    }
    else if(this.cpnValue==undefined || this.cpnValue.trim()=="")
    {
      alert("Please enter discount value");
    }
    else{
      var item = {
        type:this.cpnType,
        value:this.cpnValue,
        no:Math.floor(Math.random() * (99999 - 11111)) + 11111
      }
      this.couponList.push(item);
      this.cpnValue="";
      this.cpnType="-";
    }
    
  }

  //Delete Discount
  deleteDiscount(no:any)
  {
    this.couponList.forEach((element:any,index:any) => {
      if(no==element.no)
      {
        this.couponList.splice(index,1);
      }
    });
  }

  //Reset All data
  AllReset(){
      this.IsAllselect = false
      this.ischeck =false      
      this.itmactivelist.forEach((e:any,i:any) => {        
        this.dispar[i]= 0
        this.disparamount[i] = 0
        this.disparprice[i]=e.mrpPrice     
      });
  }


 //Set All  checked Box Selected
  Allselect($event:any){    
    if($event.target.checked==true){      
      this.IsAllselect=true;  
      this.itmactivelist.forEach((e:any,i:any) => {          
        this.ischeck[i]= true
        this.IsParticular[i]=true;
      });           
    }
    else{      
      this.IsAllselect=false; 
      this.totalChecked=0;
      this.itmactivelist.forEach((e:any,i:any) => {          
       this.ischeck[i]= false
        this.IsParticular[i]=false;
      });     
    }
  }
   //Set default checked Box
   isDefault($event:any){
    if($event.target.checked==true){      
      this.pgmIsDefault=true;            
    }
    else{      
      this.pgmIsDefault=false;      
    }
  }

   //Chech box
   check($event:any,i:any){    
    
    var totalChecked1=0;
    this.totalChecked=0;
    if($event.target.checked==true){ 
     this.ischeck[i]=true;          
       
    }
    else{      
      this.ischeck[i]=false;    
    }    
    
    var itemData = this.itmactivelist[i];
    var itemName = itemData.name;
    var totalItem = this.itmactivelist.filter((t:any)=>t.name==itemName);
   var particularIndex=-1;
   this.itemList.forEach((element:any,index:any) => {
    if(element==itemName)
    {
      particularIndex=index;
    }
    
   });
    this.itmactivelist.forEach((r:any,index:any) => {
      
      if(r.name==itemName)
      {
        if(this.ischeck[index]==true)
       {
         this.totalChecked++
          totalChecked1++;
        }
      
      }
      else{
        if(this.ischeck[index]==true)
       {
         this.totalChecked++
        }
      }
    });
    if(totalItem.length==totalChecked1)
    {
      this.IsParticular[particularIndex]=true;
    }
    else{
      this.IsParticular[particularIndex]=false;
    }
    if(this.itmactivelist.length==this.totalChecked){
      this.IsAllselect=true;
    }
    else{
      this.IsAllselect=false;
    }
    
  }

  //set Discount Value
  setDis1(event:any,i:any,a:any){
    
    this.dispar[i]=event.target.value;  
    this.setvalue[i]=this.dispar[i]
    this.disparamount[i] =  this.dispar[i]*a/100    
    this.disparprice[i] =a-this.disparamount[i] 
  }
  
  setDis2(event:any,i:any,a:any){
    this.disparamount[i]=event.target.value;  
    this.dispar[i] = this.disparamount[i]*100/a
    this.setvalue[i]=this.dispar[i]
    this.disparprice[i] =a-this.disparamount[i]   
   }
   //set discount value for Practitioner Group  
   onapply(v:any){
    this.itmactivelist.forEach((e:any,i:any) => {
      this.dispar[i]= v
      this.disparamount[i] = v*e.mrpPrice/100
    });
  }

  // get the record particular Group
  getpraGroup(id: any) {   
    this.Id = id;
    this.loading = true
    this.practitionergroupService.getDetail(id).subscribe({
      next: (data: any) => {          
        
        this.pgmName = data.name;
        this.pgmDefaultDiscount = data.defaultDiscount;
        this.itmactivelist =data.items;
        this.pgmIsDefaultCoupon=data.pgmIsDefaultCoupon;
        this.isdef=data.pgmIsDefaultCoupon;
        this.pgmIsCustomCoupon=data.pgmIsCustomCoupon;
       
        data.groupCoupon.forEach((element:any) => {
          var item = {
            type:element.type,
            value:element.value,
            no:element.no
          }
          this.couponList.push(item);
          
        });
        this.itemList = [...new Set(this.itmactivelist.map((item:any) => item.name))];
        data.items.forEach((e:any,i:any) => {
          this.totalItems++;
          this.dispar[i]= e.discount
          this.disparamount[i] = e.discountAmount
          this.disparprice[i]=e.price
          if(e.isAdded==0){
            this.ischeck[i]=false;
          }
          else{
            this.ischeck[i]=true;
            this.totalChecked++
          }
        });
        if(this.totalItems==this.totalChecked){
          this.IsAllselect=true;
        }
        else{
          this.IsAllselect=false;
        }
        
        this.itemList.forEach((element:any,index:any) => {
          var getParticular = this.itmactivelist.filter((t:any)=>t.name==element);
          var selectedParticular = this.itmactivelist.filter((t:any)=>t.name==element && t.isAdded==1);
          if(getParticular.length == selectedParticular.length){
            this.IsParticular[index]=true;
          }
        });

        this.pgmIsDefault =data.isDefault
        this.pgmIsActive = data.status
        this.loading = false       
      },
       //error: (e) => console.log(e),
      });
      
    }

    particularSelect($event:any,index:any,name:any){
      if($event.target.checked==true){
       this.itmactivelist.forEach((element:any,ind:any) => {
          if(element.name==name)
          {
            this.ischeck[ind]=true;
          }
       });
        this.IsAllselect=true;
        this.IsParticular[index]=true;
      }
      else{
        this.itmactivelist.forEach((element:any,ind:any) => {
          if(element.name==name)
          {
            this.ischeck[ind]=false;
          }
       });
        this.IsAllselect=false;
        this.IsParticular[index]=false;
      }
    }

    
   //post for Practitioner Group Edit
   onSubmit(form: NgForm) {
    this.errorCount = 0;    
   
    let groupitem :any = []
   
     var itmactivelist=this.itmactivelist;
  
     itmactivelist.map((dt:any,i:any)=>{   
      var checkIs= this.ischeck[i];
      if(checkIs == undefined || checkIs == true){      
      var qun=this.dispar[i];      
      var qun1 = this.setvalue[i]
      if(qun != qun1 && qun1){
        qun =this.setvalue[i];
      }
      var dsamount=dt.mrpPrice * qun/100;     
      var fprice=dt.mrpPrice-dsamount;     
      var items={
        id:dt.id,
        itmName:dt.name,
        itmVName:dt.vname,
        itmCostPrice:parseInt(dt.costPrice),
        itmMrp:parseInt(dt.mrpPrice),
        itmPDiscount:isNaN(qun)|| qun==''?"0":(qun).toString(),
        itmPDiscountAmount:isNaN(dsamount)?"0":dsamount.toString(),
        itmPPrice:isNaN(fprice)?parseInt(dt.mrpPrice).toString():fprice.toString()
        //itmPDiscount:isNaN(qun)|| qun==''?0:parseInt(qun),
        //itmPDiscountAmount:isNaN(dsamount)?0:dsamount,
        //itmPPrice:isNaN(fprice)?parseInt(dt.mrpPrice):fprice
      }
      groupitem.push(items)
    }
     })     
     
    //Name validation
    if (this.pgmName == undefined) {
      this.errorCount++;
      this.pgmnameMessage = 'Please enter name';
    } else {
      if (this.pgmName.trim() == '') {
        this.errorCount++;
        this.pgmnameMessage = 'Please enter valid name';
      } else {       
          this.pgmnameMessage = '';       
      }
    }   

    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');

      this.practitionergroupService.pragroup.id = this.Id
      this.practitionergroupService.pragroup.adminId = this.adminId;
      this.practitionergroupService.pragroup.pgmName = this.pgmName;      
      if(this.pgmDefaultDiscount == undefined || isNaN(this.pgmDefaultDiscount )|| this.pgmDefaultDiscount == ""){
        this.practitionergroupService.pragroup.pgmDefaultDiscount =0
      }else{
        this.practitionergroupService.pragroup.pgmDefaultDiscount =parseInt(this.pgmDefaultDiscount);  
      }   
     
      this.practitionergroupService.pragroup.pgmIsDefault = this.pgmIsDefault; 
      this.practitionergroupService.pragroup.pgmIsActive = this.pgmIsActive;
      this.practitionergroupService.pragroup.practitionerGroupItem = groupitem;
      this.practitionergroupService.pragroup.pgmIsDefaultCoupon = this.pgmIsDefaultCoupon;
      this.practitionergroupService.pragroup.pgmIsCustomCoupon = this.pgmIsCustomCoupon;
      this.practitionergroupService.pragroup.groupCoupon = this.couponList;
      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start Practitioner Group edit service
        this.practitionergroupService.editpraGroup().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.practitionergroupService.pragroup.pgmName = '';           
            this.router.navigate([environment.practitionergroupList]);
          }
        });
      }
    }
   }
}
