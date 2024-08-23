import {User} from "./user.model";
import {Task} from "./task.model";

export class Activity {
  constructor(
    public userId:number,
    public name: string,
    public startTime: Date,
    public task:Task,
    public id?:number
  )
  {}
}
