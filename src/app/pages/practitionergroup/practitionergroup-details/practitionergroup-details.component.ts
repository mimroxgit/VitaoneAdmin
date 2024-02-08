import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PractitionergroupService } from 'src/app/services/practitionergroup.service';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-practitionergroup-details',
  templateUrl: './practitionergroup-details.component.html',
  styleUrls: ['./practitionergroup-details.component.css']
})
export class PractitionergroupDetailsComponent {

  practitionergrouplistUrl = "/" + environment.practitionergroupList


  pgmName:any
  itmactivelist:any;
  loading =true;
  loading1=true;
  //group by practitioner  
  grpralist:any
  grpralistloading:any
  constructor(    
    public practitionergroupService: PractitionergroupService,
    public practitionerService:PractitionersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getpraGroup(this.route.snapshot.params['id']);
    
  }

   // get the record particular group
   getpraGroup(id: any) {
        
    this.loading = true
    this.practitionergroupService.getData(id).subscribe({
      next: (data: any) => {      
        
       this.pgmName = data.pgmName;
      //   this.pgmDefaultDiscount = data.defaultDiscount;
         this.itmactivelist =data.practitionerGroupItem  
         this.grPralist();   
                                     
        this.loading = false        
      },
      //error: (e) => console.log(e),
    });
  }

   //get the record particular group by practitioner
   private grPralist() {
    this.grpralist = null;
    this.grpralistloading = true;
    this.practitionerService.listgrpra(this.route.snapshot.params['id']).subscribe({
      next: (data: any) => {           
        this.grpralist = data;
        this.grpralistloading = false;
      },
    });
  }
}
