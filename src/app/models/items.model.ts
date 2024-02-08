export class Items {
    id='';
    adminId:any;
    itmName:any;
    itmSlug:any;
    itmSeoTitle:any;
    itmSeoDesc:any;
    itmSeoKeywords:any;
    itmHsnCode:any;
    itmSacCode:any;    
    itmIsGst:any;
    itmIGst:any;
    itmCGst:any;
    itmSGst:any;
    itemDose:any;
    itmCategory:any;
    subCategories:any;
    pratitionerCategories:any;
    itmShortDesc:any;
    itmLongDesc:any;
    itmImageGallery="";
    itmVideo="";
    itmDocumentation:any;
    itmSampleReport:any;
    itmIsActive:any;
    itmFeatures:any;
    itmIsBestSeller:any;
    itemVariants:itemVariants[]|any;
    itemDescriptions: itemDescriptions[] |any;
    itmType:any;
    itmDuration:any;
    
}

export class itemDescriptions{    
    title:any;
    description:any;    
}

export class itemVariants{    
      name:any;
      itmCostPrice:any;
      itmMRP:any;
      itmQty:any;
      unitId:any;
      unitName:any;
      isDefault:any;
      itmIsOffer:any;
      itmOfferPrice:any;
      itmVDuration:any;
      itmVDurationType:any;
}

export class groupVariants{    
    id='';
    groupName:any;
    groupId:any;
    itmName:any;
    itmVName:any;
    itmCostPrice:any;
    itmMrp:any;
    itmPDiscount:any;
    itmPDiscountAmount:any;
    itmPPrice:any;
}


//Delete
export class imageDel{    
    id:any;
    image:any;    
}
//Item Add module

export class ItemsModule {
    id='';
    adminId:any;
    courseModule:courseModule[]|any;
}

export class courseModule{    
    id:any;    
}

export class courseParticipant{    
    courseId:any;   
    id:any;
}

export class editCourseParticipant{    
    id:any;   
    camStartDate:any;
    camExpiryDate:any;
}

export class DeleteItemsModule {
    id='';
    adminId:any;
    moduleId:any
}
