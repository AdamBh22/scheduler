import { Dependency } from './dependency.model';
import { Comment } from './comment.model';
import { Activity } from './activity.model';

export class Task {
  constructor(
    public id: number,
    public name: string,
    public status: string,
    public priority: string,
    public assignedTo: string,
    public starting: Date,
    public ending: Date,
    public dependencies: Dependency[],
    public description: string,
    public comments: Comment[],
    public activities: Activity[],
    public projectId: number
  ) {}
}
