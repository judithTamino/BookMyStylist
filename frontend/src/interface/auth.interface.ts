export interface IToken {
  _id: string;
  isAdmin: boolean;
  iat: Date;
  exp: Date;
}

export interface ILogin {
  email: string;
  password: string;
}
