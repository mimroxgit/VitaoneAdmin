export class Subcategories {
    id : any;
    adminId: string;
    categoryId:any
    scatTitle : string;    
    scatImage :string;
    scatActive : boolean; 
  
    constructor() {
      this.id = '';      
      this.adminId = '';
      this.categoryId='';
      this.scatTitle = ''; 
      this.scatImage = ''     ;
      this.scatActive = true;           
    }
}
