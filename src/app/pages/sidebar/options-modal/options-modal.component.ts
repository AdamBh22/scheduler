import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Modal } from 'bootstrap';
import { Task } from '../../../models/task.model';
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-options-modal',
  templateUrl: './options-modal.component.html',
  styleUrls: ['./options-modal.component.scss']
})
export class OptionsModalComponent {
  @Output() deleteProject = new EventEmitter<number>();
  @Output() addNewTask = new EventEmitter<number>(); // Emit the projectId only
  @Input() projectId!: number;

  constructor(protected projectService: ProjectService) {
  }
  openModal(projectId: number) {
    this.projectId = projectId;
    const modalElement = document.getElementById('optionsModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  onDeleteProject(event:Event) {
    event.stopPropagation();
    this.projectService.deleteProject(this.projectId);
    this.deleteProject.emit(this.projectId);
    this.closeModal();
  }

  onAddNewTask(event:Event) {
    event.stopPropagation();
    this.addNewTask.emit(this.projectId);
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
