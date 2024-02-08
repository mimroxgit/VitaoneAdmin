import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent {

  searchString1 :any 
  inventorycreateurl="/"+environment.inventoryCreate 
  inventorydetailurl="/"+environment.inventoryDetails 

  invlist:any
  invlistloading:any
  
  constructor(
    public inventoryService:InventoryService,  
    private router : Router){     
      this.invelist();
  }
  
 //onchange type search
  onchaneg(item:any){
    this.searchString1 = item    
  }

   //get the list from inventory
   private invelist() {
    this.invlist = null;
    this.invlistloading = true;
    this.inventoryService.listInventory().subscribe({
      next: (data: any) => {                
        this.invlist = data;
        this.invlistloading = false;
      },
    });
  }
}
