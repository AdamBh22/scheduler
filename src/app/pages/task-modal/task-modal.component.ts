import { Component, Input, ViewChild } from '@angular/core';
import { Task } from '../../models/task.model';
import { Dependency } from '../../models/dependency.model';
import { Comment } from '../../models/comment.model';
import { Activity } from '../../models/activity.model';
import { User } from '../../models/user.model';
import { Modal } from 'bootstrap';
import { NewDependencyModalComponent } from "./new-dependency-modal/new-dependency-modal.component";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  @Input() task?: Task;
  @Input() tasks: Task[] = [];
  @ViewChild(NewDependencyModalComponent) newDependencyModal!: NewDependencyModalComponent;

  // Open the task modal
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

  // Close the task modal
  closeModal() {
    const modalElement = document.getElementById('taskModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  // Open the new dependency modal
  openNewDependencyModal() {
    this.newDependencyModal.tasks=this.tasks;
    this.newDependencyModal.openModal();
  }

  // Handle the created dependency
  onDependencyCreated(dependency: Dependency) {
    if (this.task) {
      this.task.dependencies.push(dependency);
    }
  }
}
