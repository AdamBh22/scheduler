import { Component, Input, ViewChild } from '@angular/core';
import { Task } from '../../models/task.model';
import { Dependency } from '../../models/dependency.model';
import { Modal } from 'bootstrap';
import { NewDependencyModalComponent } from "./new-dependency-modal/new-dependency-modal.component";
import { UserService } from "../../services/user.service";
import { Comment } from '../../models/comment.model';
import { Activity } from "../../models/activity.model";
import {TaskService} from "../../services/task.service";
import {User} from "../../models/user.model";
import {Observable, of, tap} from "rxjs";
import {CommentService} from "../../services/comment.service";
import {ActivityService} from "../../services/activity.service";
import {DependencyService} from "../../services/dependency.service";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  @Input() task?: Task;
  @Input() tasks: Task[] = [];
  @ViewChild(NewDependencyModalComponent) newDependencyModal!: NewDependencyModalComponent;

  newCommentText: string = '';
  newSubtaskName: string = '';
  userId:number = 1;
  userCache: Map<number, User> = new Map();

  constructor(protected userService: UserService,
              protected taskService: TaskService,
              protected commentService: CommentService,
              protected activityService: ActivityService,
              protected dependencyService: DependencyService,
              )
  {

  }

  openModal() {
    if (this.task) {
      const modalElement = document.getElementById('taskModal');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    } else {
      console.error('Task is not defined');
    }
  }

  closeModal() {
    const modalElement = document.getElementById('taskModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  openNewDependencyModal(): void {
    if (this.task) {
      this.newDependencyModal.task = this.task;
      this.newDependencyModal.tasks = this.tasks;
      this.newDependencyModal.openModal();
    } else {
      console.error('Task is not defined');
    }
  }

  onDependencyCreated(dependency: Dependency) {
    if (this.task) {
      this.task.dependencies.push(dependency);
      this.dependencyService.addDependency(dependency);
      // const newActivity: Activity = {
      //   userId: this.userId,
      //   name: 'ADD_DEPENDENCY',
      //   startTime: new Date(),
      //   task: this.task,
      // };
      // this.task.activities.push(newActivity);
    }
  }

  addComment() {
    if (this.task && this.newCommentText.trim()) {
      const newComment: Comment = {
        userId:this.userId,
        text: this.newCommentText,
        task: this.task
      };
      this.task.comments.push(newComment); // *****
      this.commentService.addComment(newComment);
      // const newActivity: Activity = {
      //   userId: this.userId,
      //   task: this.task,
      //   startTime: new Date(),
      //   name: '_ADD_COMMENT',
      //   id: Date.now()
      // };
      // this.task.activities.push(newActivity);// *****
      // console.log(newActivity.userId);
      this.newCommentText = '';
    }
  }

  addSubtask() {
    if (this.newSubtaskName.trim()) {
      this.openNewTaskModal();
      const newActivity: Activity = {
        userId: this.userId,
        task: this.task!,
        startTime: new Date(),
        name: '_ADD_SUBTASK',
        id: Date.now()
      };
      this.task?.activities.push(newActivity);
      this.newSubtaskName = '';
    }
  }

  openNewTaskModal() {

  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'In Progress': return 'bg-yellow';
      case 'Late': return 'bg-red';
      case 'Unplanned': return 'bg-gray';
      case 'Complete': return 'bg-green';
      case 'To Do': return 'bg-blue';
      default: return 'bg-yellow';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'High': return 'bg-red';
      case 'Medium': return 'bg-blue';
      case 'Low': return 'bg-green';
      case 'None': return 'bg-gray';
      default: return '';
    }
  }
  getTaskById(id: number): Observable<Task> {
    return this.taskService.getTaskById(id);
  }



  getUserById(userId: number): Observable<User> {
    return this.userService.getUserById(userId);
  }


}
