export class Categories {
    adminId: string;
    id : any;
    catTitle : string;    
    CatImage :any
    catActive : boolean; 
  
    constructor() {
      this.id = '';
      this.adminId = '';
      this.catTitle = '';     
      this.CatImage = '';  
      this.catActive = true;           
    }
  }