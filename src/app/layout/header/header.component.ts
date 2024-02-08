import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userName = localStorage.getItem('user')
  settingsUrl            = "/" + environment.settings; 
  data :any[] = [
    {
      username :'Bradd Haddin',
      userrole :'Super Admin',
      profile:'/assets/images/profile-img.jpg'},    
  ];

  constructor(@Inject(DOCUMENT) private document: Document,
  private router: Router) {     
  }

 
  ngOnInit(): void {
  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }


   //Logout 
   logout(): void {
    localStorage.clear();
    this.router.navigate([environment.login]);
  }
}
