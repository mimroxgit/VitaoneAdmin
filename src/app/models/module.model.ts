export class Module {
    id : any;
    adminId  : any;   
    mdlTitle :any;
    mdlDescription :any;
    mdlActive:any        
}

export class ModuleLesson {
    id : any;
    adminId  : any;   
    moduleId :any;    
    lessonId:lessonId[]|any;      
}

export class lessonId{    
    id:any;      
}
