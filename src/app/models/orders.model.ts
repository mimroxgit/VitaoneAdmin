export class OrdersStatus {
    orderId:any
    adminId:any
    orderStatus:any
    paymentStatus:any   
    orderRemark:any
    razorPayStatus:any
}

export class OrdDispatch {
    adminId:any
    orderId:any
    odiCompany:any
    odiTrackingUrl:any
    odiDocketNo:any
    odiRemark:any
    paymentStatus:any   
    razorPayStatus:any
}

export class PayNow {    
    practionerId:any
    commissionAmount:any
    paymentDate:any
    remark:any
    orderId :ordId[] |any   
}

export class ordId{    
    id:any;
    
}

export class orderInvoice{    
    id:any;    
}

export class PatientAddress{    
    id:any;
    type:any
    address:any
    
}

export class orderInitiate{    
    ormNo:any
    ormInitiateRemark:any
    rzrPaymentId:any
    
}




