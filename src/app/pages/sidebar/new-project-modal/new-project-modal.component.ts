import { Component, EventEmitter, Output } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.scss']
})
export class NewProjectModalComponent {
  @Output() projectAdded = new EventEmitter<{ id: number, name: string }>();
  newProjectName: string = '';

  openModal() {
    const modalElement = document.getElementById('newProjectModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  addNewProject() {
    if (this.newProjectName.trim()) {
      const newProject = {
        id: Date.now(), // Using current timestamp as a unique ID
        name: this.newProjectName.trim()
      };
      this.projectAdded.emit(newProject);
      this.newProjectName = '';
      const modalElement = document.getElementById('newProjectModal');
      if (modalElement) {
        const modal = Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
  }
}
