import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.css']
})
export class InventoryDetailsComponent {

  orderdetailsurl ="/" + environment.ordersDetails
  inventorylistUrl="/"+environment.inventoryList 
  searchString1 :any 
  invDlist:any
  invDlistloading:any
  invItemName="";
  inttamount=0
  outtamount=0

  constructor(
    public inventoryservice: InventoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getinvetory(this.route.snapshot.params['id']);
  }

  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

   // get the record invetory
   getinvetory(id: any) {
    
    this.invDlistloading = true
    this.inventoryservice.getInventory(id).subscribe({
      next: (data: any) => {        
        var d = data[0];
        this.invItemName=d.itemName;
        this.invDlist = data
        var dlist = this.invDlist
        dlist.forEach((e:any) => {
          this.inttamount +=  e.inQty
          this.outtamount +=  e.outQty
          
        });
         this.invDlistloading = false
      },
      //error: (e) => console.log(e),
    });
  }
}
