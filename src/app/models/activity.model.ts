import {User} from "./user.model";

export class Activity {
  constructor(
    public id: number,
    public user: User,
    public name: string
  )
  {}
}
