import { User } from './user.model';

export class Comment {
  constructor(public id: number, public text: string, public author: User) {}
}
