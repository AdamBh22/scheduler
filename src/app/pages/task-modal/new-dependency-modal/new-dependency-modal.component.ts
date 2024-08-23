import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dependency} from "../../../models/dependency.model";
import {Modal} from "bootstrap";
import {Task} from "../../../models/task.model";
import {TaskService} from "../../../services/task.service";

@Component({
  selector: 'app-new-dependency-modal',
  templateUrl: './new-dependency-modal.component.html',
  styleUrls: ['./new-dependency-modal.component.scss']
})
export class NewDependencyModalComponent {
  @Output() dependencyCreated = new EventEmitter<Dependency>();
  @Input() tasks: Task[] = [];
  task=new Task();

  selectedTask: Task | null = null;
  dependencyType: string = 'On hold';
  dependencyTypes: string[] = ['On hold', 'Blocking'];

  constructor(private taskService: TaskService,) {
  }

  openModal() {
    const modalElement = document.getElementById('newDependencyModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      if(modal){
        modal.hide();
      }
      modal.show();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('newDependencyModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        console.log(this.tasks);
        modal.hide();
      }
    }
  }

  createDependency() {
    console.log(this.selectedTask);
    if (this.selectedTask && this.selectedTask.id!== undefined && this.dependencyType) {
      console.log(this.selectedTask);
      console.log(this.dependencyType);
      const newDependency = new Dependency(
        this.dependencyType,
        this.task,
        this.selectedTask.id
      );
      this.dependencyCreated.emit(newDependency);
      this.dependencyType = 'On hold';
      this.closeModal();
    }
  }

  protected readonly Task = Task;

}
