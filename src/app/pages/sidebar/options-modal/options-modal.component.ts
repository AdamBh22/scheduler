import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Modal } from 'bootstrap';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-options-modal',
  templateUrl: './options-modal.component.html',
  styleUrls: ['./options-modal.component.scss']
})
export class OptionsModalComponent {
  @Output() deleteProject = new EventEmitter<number>();
  @Output() addNewTask = new EventEmitter<number>(); // Emit the projectId only
  @Input() projectId!: number;

  openModal(projectId: number) {
    this.projectId = projectId;
    const modalElement = document.getElementById('optionsModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  onDeleteProject() {
    this.deleteProject.emit(this.projectId);
    this.closeModal();
  }

  onAddNewTask() {
    this.addNewTask.emit(this.projectId); // Emit the projectId only
    this.closeModal();
  }

  closeModal() {
    const modalElement = document.getElementById('optionsModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
}
