export class AuthUserDto {
  email!: string;
  password!: string;
}

export class AuthUserOutputDto {
  email!: string;
  userId!: string;
  password!: string;
  token!: string;
}
