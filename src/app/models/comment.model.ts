import { User } from './user.model';
import {Task} from "./task.model";

export class Comment {
  constructor(
    public text: string,
    public userId:number,
    public task:Task,
    public id?: number
  )
  {}
}
