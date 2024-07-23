import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { Dependency } from '../../models/dependency.model';
import { Comment } from '../../models/comment.model';
import { Activity } from '../../models/activity.model';
import { User } from '../../models/user.model';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  @Input() task!: Task; // The task to display

  constructor() {}
  openModal() {
    const modalElement = document.getElementById('taskModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
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
}
