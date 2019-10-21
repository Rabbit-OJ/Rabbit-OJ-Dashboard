export interface LoginResponseUser {
  uid: string;
  username: string;
  isAdmin: boolean;
}

export interface MiniUser extends LoginResponseUser {
  isLogin: boolean;
}
