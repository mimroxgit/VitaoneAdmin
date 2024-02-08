import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-items-details',
  templateUrl: './items-details.component.html',
  styleUrls: ['./items-details.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ItemsDetailsComponent {

  itemslistUrl = "/" + environment.itemsList;
  urlSafe:SafeResourceUrl | undefined;
  
  itemDescriptions:any;
  itemdetail:any;
  itmImage:any;
  name:any;
  loading = false;
  imgeUrl = environment.cdnUrl + 'Product/';
  docUrl = environment.docUrl
  imageGallary:any=[];

  constructor(
    public sanitizer:DomSanitizer,
    public itemsService: ItemsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getitem(this.route.snapshot.params['id']);
  }

   // get the record particular item details
   getitem(id: any) {
    this.loading = true
    this.itemsService.getDetail(id).subscribe({
      next: (data: any) => {                 
        this.name = data.itmName
        if(data.itmVideo != null ||data.itmVideo != '-' || data.itmVideo != ''){
          this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(data.itmVideo)
        }
        this.itemdetail =data
        this.itemDescriptions=data.itemDescriptions
        this.itmImage = data.itmImageGallery.split(",")
        this.imageGallary=[];
       

        if(data.itmImageGallery!= null){
          let  imageGallary = data.itmImageGallery.split(',');
          imageGallary.forEach((item:any) => {            
            let i:any ={
              image: this.imgeUrl+item,
              thumbImage:this.imgeUrl+item
            }
            if(item!=""){
              this.imageGallary.push(i);
            }
          });
        }
        
        this.loading = false
      },
      //error: (e) => console.log(e),
    });
  }
}
