import { Component, EventEmitter, Output } from '@angular/core';
import { Modal } from 'bootstrap';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.scss']
})
export class NewProjectModalComponent {
  @Output() projectAdded: EventEmitter<Project> = new EventEmitter<Project>();
  newProjectName: string = '';

  addNewProject() {
    if (this.newProjectName.trim()) {
      const newProject: Project = {
        id: Date.now(),
        name: this.newProjectName.trim(),
        tasks: []
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
