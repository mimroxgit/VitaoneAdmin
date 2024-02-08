export class Login {
  username  : any;
  password: any;
}

//Forgot
export class Forgot {
  email: string;
  
    constructor() {
      this.email = '';
    }
  }

  //Otpverify
  export class Otpverify{
    id:any;
    otp:any;
  }  

  //Resetpassword
  export class Resetpassword {
    resetId: string;
    Password: string;
  
    constructor() {
      this.resetId = '';
      this.Password = '';
    }
  }
  