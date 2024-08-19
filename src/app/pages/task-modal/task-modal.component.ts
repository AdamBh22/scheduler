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

  constructor(private userService: UserService,private taskService: TaskService) {}

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

      const newActivity: Activity = {
        user: this.userService.getUser(),
        name: 'ADD_DEPENDENCY',
        id: Date.now()
      };
      this.task.activities.push(newActivity);
    }
  }

  addComment() {
    if (this.task && this.newCommentText.trim()) {
      const newComment: Comment = {
        id: Date.now(),
        author: this.userService.getUser(),
        text: this.newCommentText
      };
      this.task.comments.push(newComment);

      const newActivity: Activity = {
        user: this.userService.getUser(),
        name: 'ADD_COMMENT',
        id: Date.now()
      };
      this.task.activities.push(newActivity);

      this.newCommentText = '';
    }
  }

  addSubtask() {
    if (this.newSubtaskName.trim()) {
      this.openNewTaskModal();
      const newActivity: Activity = {
        user: this.userService.getUser(),
        name: 'ADD_SUBTASK',
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
  getTaskById(id: number): Task | null {
    const task = this.tasks.find((task) => task.id === id);
    return task !== undefined ? task : null;
  }
  getUserById(userId: number): User | null {
    const user = this.userService.getUserById(userId);
    return user || null;
  }
}
