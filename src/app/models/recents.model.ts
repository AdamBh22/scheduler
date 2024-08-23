import {User} from "./user.model";

export class Recent {
  constructor(
  public date: Date,
  public type: string,
  public user: User,
  public  id?: number,
  ) {
  }
}
