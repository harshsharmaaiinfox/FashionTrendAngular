import { 
  AuthNumberLoginState,
  AuthUserForgotModel, 
  AuthUserStateModel, 
  AuthVerifyNumberOTPState, 
  RegisterModal, 
  UpdatePasswordModel, 
  VerifyEmailOtpModel 
} from "../interface/auth.interface";

export class Register {
  static readonly type = "[Auth] Register";
  constructor(public payload: RegisterModal) {}
}

export class Login {
  static readonly type = "[Auth] Login";
  constructor(public payload: AuthUserStateModel) {}
}

export class LoginWithNumber {
  static readonly type = "[Auth] Login With Number";
  constructor(public payload: AuthNumberLoginState){}
}

export class ForgotPassWord {
  static readonly type = "[Auth] Forgot";
  constructor(public payload: AuthUserForgotModel) {}
}

export class VerifyEmailOtp {
  static readonly type = "[Auth] VerifyEmailOtp";
  constructor(public payload: VerifyEmailOtpModel) {}
}

export class VerifyNumberOTP{
  static readonly type = "[Auth] VerifyNumberOTP";
  constructor(public payload: AuthVerifyNumberOTPState){}
}

export class UpdatePassword {
  static readonly type = "[Auth] UpdatePassword";
  constructor(public payload: UpdatePasswordModel) {}
}

export class Logout {
  static readonly type = "[Auth] Logout";
}

export class AuthClear {
  static readonly type = "[Auth] Clear";
}

