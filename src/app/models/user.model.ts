export class User {
  constructor(
    public email: string,
    public fullName: string,
    public role: string,
    private password: string
  ) {}
}
