import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { Modal } from 'bootstrap';
import { OptionsModalComponent } from './options-modal/options-modal.component';
import { NewTaskModalComponent } from './new-task-modal/new-task-modal.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('optionsModal') optionsModal!: OptionsModalComponent;
  @ViewChild('newTaskModal') newTaskModal!: NewTaskModalComponent;

  currentView: string = 'home';
  showProjects: boolean = false;
  projects: Project[] = [
    new Project(1, 'Project 1', [
      new Task(1, 'Task 1', 'To Do', 'High', 'User1', new Date('2024-07-19')),
      new Task(2, 'Task 2', 'In Progress', 'Medium', 'User2', new Date('2024-07-20'))
    ]),
    new Project(2, 'Project 2', [
      new Task(3, 'Task 3', 'Complete', 'Low', 'User3', new Date('2024-07-21'))
    ])
  ];

  ngOnInit(): void {}

  navigateTo(view: string) {
    this.currentView = view;
  }

  toggleProjects() {
    this.showProjects = !this.showProjects;
  }

  navigateToProject(projectId: number) {
    console.log(`Navigating to project ${projectId}`);
  }

  navigateToTask(taskId: number) {
    console.log(`Navigating to task ${taskId}`);
  }

  openAddNewProjectModal(event: Event) {
    event.stopPropagation();
    const modalElement = document.getElementById('newProjectModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  openOptionsModal(event: Event, projectId: number): void {
    event.stopPropagation();
    this.optionsModal.openModal(projectId);
  }

  onProjectAdded(project: Project) {
    this.projects.push(project);
  }

  deleteProject(projectId: number) {
    this.projects = this.projects.filter(project => project.id !== projectId);
  }

  addNewTask(event: { projectId: number, task: Task }) {
    const project = this.projects.find(p => p.id === event.projectId);
    if (project) {
      project.tasks.push(event.task);
    }
  }

  onAddNewTask(projectId: number) {
    this.newTaskModal.projectId = projectId; // Set the projectId for the NewTaskModal
    const modalElement = document.getElementById('newTaskModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }
}
