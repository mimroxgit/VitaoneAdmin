import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PractitionercategoriesService } from 'src/app/services/practitionercategories.service';
import { PractitionergroupService } from 'src/app/services/practitionergroup.service';
import { PractitionersService } from 'src/app/services/practitioners.service';
import { environment } from 'src/environments/environments';

//add api Url
const baseURL = environment.apiUrl;

@Component({
  selector: 'app-practitioners-list',
  templateUrl: './practitioners-list.component.html',
  styleUrls: ['./practitioners-list.component.css']
})
export class PractitionersListComponent {

  Practitionerscreateurl = "/"+environment.practitionersCreate  
  Practitionersediturl   = "/" +environment.practitionersEdit 
  

  
  searchString1 :any
  Practitionerslist:any
  Practitionerslistloading:any
  
  tableThlist2= ['Reg.Date', 'Category','Name','Email','Contact','Group','Reg.By','Default']
  tableTdlist = ['regDate','category','name','email','contact','group','regBy','default']
  //fieldName is show Delete popmenu Name
  fieldName = "name";
  //statusName is show Active & DeActive  Name
  statusName = "status"
  scatname:any
  
  no=0;
  isdel = false;

  //Search
  @Input() Isshowselectbox = true; 
  fromDate="-";
  toDate="-";   
  groupId="All"
  groptions:any;
  grfilteredOptions:any;  
  pracatId="All"
  pracatoptions:any;
  pracatfilteredOptions:any;
  regType="All"  
  @ViewChild('type') type !: ElementRef;
	
  constructor(
    public practitionergroupService: PractitionergroupService,
    public PraCategoriesService:PractitionercategoriesService,
    public practitionersService:PractitionersService,
    private router : Router){
    this.Practitionerlist()
    this.grouplistactive();
    this.pracategorylistactive();
  }

  //onchange type dropdown serch
  ontype(){  
    this.regType = this.type.nativeElement.value;    
  } 
  
  //onchange Group dropdown serch
  ongroup(name:any){    
    this.groupId = name;  
   }

  //get the list from Group DropDown Search
  private grouplistactive() {    
    this.practitionergroupService.listActpragroup().subscribe({
      next: (data) => { 
        this.groptions=data;      
        this.grfilteredOptions = data;                   
      },     
    });
  }
  
  //onchange practitioner category dropdown serch
   onpracat(name:any){    
    this.pracatId = name;  
   }

  //get the list from  Practitioner Category actvie
  private pracategorylistactive() {   
    this.PraCategoriesService.listActpracategories().subscribe({
      next: (data) => {       
               
        this.pracatoptions = data; 
        this.pracatfilteredOptions = data;                 
      },     
    });
  }

  //onserch button click
  onsearch(){
    if(this.regType=="All" || this.regType=="-" || this.regType == "" || this.regType==undefined )
    {      
      this.regType = 'All'
    }
    if(this.groupId=="All" || this.groupId=="-" || this.groupId == "" || this.groupId==undefined )
    {
      
      this.groupId = 'All'
    }
    if(this.pracatId=="All" || this.pracatId=="-" || this.pracatId == "" || this.pracatId==undefined )
    {
      
      this.pracatId = 'All'
    }
    if( this.fromDate=="-" || this.fromDate == "" || this.fromDate==undefined )
    {
      this.fromDate = '-'
    }
    if( this.toDate=="-" || this.toDate == "" || this.toDate==undefined )
    {
      this.toDate = '-'
    }
    this.Practitionerlist();
  }
  
  //onchange type search
  onchaneg(item:any){
    this.searchString1 = item
  }

  //set edit id
  editpractitioners(item:any){    
    this.router.navigate([environment.practitionersEdit+"/"+item.id]);
  }

  //set detail id
  detailpractitioners(item:any){    
    this.router.navigate([environment.practitionersDetails+"/"+item.id]);
  }

   //scroll
  //  onScroll(){        
  //     setTimeout(()=>{        
  //       this.no=this.no+1;        
  //       const apiUrl = `${baseURL + 'AdminPractitioner/List?no='}${this.no}&fromDate=${this.fromDate}&toDate=${this.toDate}&groupId=${this.groupId}&catId=${this.pracatId}&regType=${this.regType}`;
  //     this.practitionersService.commenDataList(apiUrl).subscribe({
  //       next: (data:any) => {          
  //         this.Practitionerslist = [...this.Practitionerslist,...data];                                       
  //         this.Practitionerslistloading=false;
  //       },       
  //     });
  //     }, 0);        
  //  }

   //get the list from Practitioners
  private Practitionerlist() {
    
    this.Practitionerslist = null;
    this.Practitionerslistloading = true;
    //let n = 0;
    //const apiUrl = `${baseURL + 'AdminPractitioner/List?no='}${n}&fromDate=${this.fromDate}&toDate=${this.toDate}&groupId=${this.groupId}&catId=${this.pracatId}&regType=${this.regType}`;
    const apiUrl = `${baseURL + 'AdminPractitioner/List1?fromDate='}${this.fromDate}&toDate=${this.toDate}&groupId=${this.groupId}&catId=${this.pracatId}&regType=${this.regType}`;
    this.practitionersService.commenDataList(apiUrl).subscribe({
      next: (data) => {                               
        this.Practitionerslist = data;                      
       // this.onScroll();                  
        this.Practitionerslistloading = false;
        
      },
      
     // error: (e) => console.log(e),
    });
    
  }

  //delete the Practitioners data 
  deletePractitioner(item: any) {
    this.practitionersService.deletePractitioners(item.id).subscribe({
      next: (res) => {   
        this.Practitionerlist();      
        this.isdel = false;
      },      
    });
  }
}
