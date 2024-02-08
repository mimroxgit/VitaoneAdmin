import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { ItemsService } from 'src/app/services/items.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css']
})
export class InventoryCreateComponent {

  inventorylistUrl = "/" + environment.inventoryList
  
  itmactivelist: any;
  ilist:any
  itmvariantsactivelist: any;
  
  productId = '-';
  ivnBatchNo :any
  invInQty :any
  invRemark :any
  invDate:any
 
 

  loading = false;
  mes: any;
  response: any;
  dateMessage:any
  batchNoMessage: any;
  inQtyMessage:any
  itemdropdownMessage: any; 
  errorCount = 0;
  @Input() Isshowselectbox = true; 

  constructor(
    public itemService: ItemsService,
    public inventoryService: InventoryService,
    private router: Router
  ) {   
    this.itemlistactive();
  }

  //Item
  onchange(id: any) {
      
    //let itmv:any; 
    //itmv = this.ilist.filter((a:any)=>a.id == id)
    //this.itmvariantsactivelist = itmv[0].variants
    
    this.inventoryService.inv.productId = id;
    this.productId = this.inventoryService.inv.productId
  }
 
  //Item variants
  onchangev(id:any){

  }

 
   //get the list from Item actvie
   private itemlistactive() {
    this.itmactivelist = null;
    this.itemService.listActitemsDD().subscribe({
      next: (data) => {                       
        this.ilist = data
        this.itmactivelist = data;         
        
         
      },
     // error: (e) => console.log(e),
    });
  }

  //post for Sub Inventory Create
  onSubmit(form: NgForm) {
    this.errorCount = 0;

     //item dropdown validation
     if (this.productId == '-') {
      this.errorCount++;
      this.itemdropdownMessage = 'Please select item';
    } else {
      this.itemdropdownMessage = '';
    }

     //ivnBatchNo validation
     if (this.invDate == undefined) {
      this.errorCount++;
      this.dateMessage = 'Please enter date';
    } else {
      if (this.invDate.trim() == '') {
        this.errorCount++;
        this.dateMessage = 'Please enter valid date';
      } else {       
          this.dateMessage = '';       
      }
    }   

    //ivnBatchNo validation
    if (this.ivnBatchNo == undefined) {
      this.errorCount++;
      this.batchNoMessage = 'Please enter batchNo';
    } else {
      if (this.ivnBatchNo.trim() == '') {
        this.errorCount++;
        this.batchNoMessage = 'Please enter valid batchNo';
      } else {       
          this.batchNoMessage = '';       
      }
    }   

    //InQty validation
    if (this.invInQty == undefined) {
      this.errorCount++;
      this.inQtyMessage = 'Please enter qty';
    } else {
      if (this.invInQty.trim() == '') {
        this.errorCount++;
        this.inQtyMessage = 'Please enter valid qty';
      } else {       
          this.inQtyMessage = '';       
      }
    }   

    if (this.errorCount == 0) {
      
      this.inventoryService.inv.invDate = this.invDate;     
      this.inventoryService.inv.ivnBatchNo = this.ivnBatchNo;     
      this.inventoryService.inv.invInQty = this.invInQty;    
      if(this.invRemark == undefined){
        this.inventoryService.inv.invRemark = "-";
      }else{
        this.inventoryService.inv.invRemark = this.invRemark;     
      }             

      //loading condition start
      if (this.loading == false) {
        this.loading = true;
        
        //start Inventory create service
        this.inventoryService.createInventory().subscribe((res:any) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.loading = false;
          } else {
            this.loading = false;
            this.inventoryService.inv.invRemark = '';           
            this.router.navigate([environment.inventoryList]);
          }
        });
      }
    }
  }

}
