export interface IToken {
  _id: string;
  isAdmin: boolean;
  iat: Date;
  exp: Date;
}
