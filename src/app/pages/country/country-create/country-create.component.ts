import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-country-create',
  templateUrl: './country-create.component.html',
  styleUrls: ['./country-create.component.css']
})
export class CountryCreateComponent {

  countrylisturl = "/"+environment.countryList

  adminId:any
  ccmName:any
  ccmCode:any  
  ccmCurrency:any
  
  cntloading = false;
  cntnameMessage: any;
  cntcodeMessage: any;
  cntCurrencyMessage: any;
  mes: any;
  response: any;
  errorCount = 0;      
  @Input() Isshowinput = true;
  @Input() Isshowlabeluploadfile = true;
  @Input() Isshowfileupload = true;

  constructor(
    public countryservice: CountryService,
    private router: Router
  ) {
           
    
   
  }
  

  //post for catalogues Create
  onSubmit(form: NgForm) {
    this.errorCount = 0;

    //Name validation
    if (this.ccmName == undefined || this.ccmName == "-") {
      this.errorCount++;
      this.cntnameMessage = 'Please enter country name';
    } else {
      if (this.ccmName.trim() == '') {
        this.errorCount++;
        this.cntnameMessage = 'Please enter valid country name';
      } else {       
          this.cntnameMessage = '';       
      }
    }

    //code validation
    if (this.ccmCode == undefined) {
      this.errorCount++;
      this.cntcodeMessage = 'Please enter country code';
    }else {
        if (this.ccmCode <= 0 )  {
          this.errorCount++;
          this.cntcodeMessage = 'Invalid country code';
        }else {
          this.cntcodeMessage = '';
        }      
    }
            

    if (this.errorCount == 0) {
      this.adminId = localStorage.getItem('userId');

      this.countryservice.cnt.adminId = this.adminId;
      this.countryservice.cnt.ccmName = this.ccmName;
      this.countryservice.cnt.ccmCode = this.ccmCode;          
      
      //loading condition start
      if (this.cntloading == false) {
        this.cntloading = true;

        //start category create service
        this.countryservice.createCountry().subscribe((res) => {
          this.response = res;

          if (this.response != 'Success') {
            this.mes = this.response;
            this.cntloading = false;
          } else {
            this.cntloading = false;
            this.countryservice.cnt.ccmName = '';
            this.countryservice.cnt.ccmCode = '';            
            this.router.navigate([environment.countryList]);
          }
        });
      }
    }
  }

}
