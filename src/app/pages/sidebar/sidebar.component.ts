import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { Modal } from 'bootstrap';
import { OptionsModalComponent } from './options-modal/options-modal.component';
import { NewTaskModalComponent } from './new-task-modal/new-task-modal.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('optionsModal') optionsModal!: OptionsModalComponent;
  @ViewChild('newTaskModal') newTaskModal!: NewTaskModalComponent;
  @ViewChild('taskModal') taskModal!: TaskModalComponent;

  currentView: string = 'home';
  showProjects: boolean = false;
  projects: Project[] = [
    new Project(1, 'Project 1', [
      new Task(1, 'Task 1', 'To Do', 'High', 'User1', new Date('2024-07-19'), new Date('2024-07-24'), [], '', [], []),
      new Task(2, 'Task 2', 'In Progress', 'Medium', 'User2', new Date('2024-07-20'), new Date('2024-07-27'), [], '', [], [])
    ]),
    new Project(2, 'Project 2', [
      new Task(3, 'Task 3', 'Complete', 'Low', 'User3', new Date('2024-07-21'), new Date('2024-07-30'), [], '', [], [])
    ])
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log('TaskModalComponent:', this.taskModal); // Debug log to check initialization
  }

  navigateTo(view: string) {
    this.router.navigate([`/${view}`]);
    this.currentView = view;
  }

  toggleProjects() {
    this.showProjects = !this.showProjects;
  }

  navigateToProject(event: Event, projectId: number) {
    event.preventDefault();
    this.router.navigate([`/project-table/${projectId}`]);
  }

  navigateToTask(event: Event, taskId: number) {
    event.preventDefault();
    const project = this.projects.find(p => p.tasks.some(t => t.id === taskId));
    if (project) {
      const task = project.tasks.find(t => t.id === taskId);
      if (task) {
        this.taskModal.task = task;
        this.taskModal.tasks = project.tasks; // Pass the list of all tasks in the project
        this.taskModal.openModal();
      } else {
        console.error('Task not found');
      }
    } else {
      console.error('Project not found');
    }
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
