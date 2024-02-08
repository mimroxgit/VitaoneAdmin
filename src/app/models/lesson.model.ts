export class Lesson {
    id='';
    adminId:any;
    lsmTitle:any;
    lsmDescription:any; 
    lsmActive:any;      
    lsmPdf:lsmPdf[]|any;
    lsmVideo: lsmVideo[] |any  
}

export class lsmPdf{    
    title:any;
    fileName:any; 
    isNew:any;   
}

export class lsmVideo{    
    title:any;
    url:any;    
}