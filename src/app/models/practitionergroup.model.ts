export class Practitionergroup {
  id='';
  adminId:any;
  pgmName:any;
  pgmDefaultDiscount:any;
  pgmIsActive:any;
  pgmIsDefault:any;
  pgmIsDefaultCoupon:any;
  pgmIsCustomCoupon:any;
  practitionerGroupItem: practitionerGroupItems[] |any  
  groupCoupon:groupCoupons[] |any 
}

export class practitionerGroupItems{
    id:any;
    itmName:any;
    itmVName:any;
    itmCostPrice:any;
    itmMrp:any;
    itmPDiscount:any;
    itmPDiscountAmount:any
    itmPPrice:any; 
}

export class groupCoupons{
  no:any;
  type:any;
  value:any;
}

