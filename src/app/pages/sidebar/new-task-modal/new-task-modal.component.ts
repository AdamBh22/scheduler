import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Task } from '../../../models/task.model';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss']
})
export class NewTaskModalComponent {
  @Output() taskAdded = new EventEmitter<{ projectId: number, task: Task }>();
  @Input() projectId!: number; // Receive the projectId as input

  newTaskName: string = '';
  status: string = 'To Do';
  priority: string = 'Medium';
  assignedTo: string = '';
  deadline: Date = new Date();

  addNewTask() {
    if (this.newTaskName.trim()) {
      const newTask = new Task(
        Date.now(),
        this.newTaskName.trim(),
        this.status,
        this.priority,
        this.assignedTo,
        this.deadline
      );
      this.taskAdded.emit({ projectId: this.projectId, task: newTask });
      this.newTaskName = ''; // Clear the input fields
      this.closeModal();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('newTaskModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
}
