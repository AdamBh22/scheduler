import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { OptionsModalComponent } from './options-modal/options-modal.component';
import { NewTaskModalComponent } from './new-task-modal/new-task-modal.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { Modal } from 'bootstrap';
import { Task } from '../../models/task.model';
import { RecentsService } from '../../services/recents.service';

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
  projects: Project[] = [];

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private recentsService: RecentsService
  ) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  ngAfterViewInit(): void {
    console.log('TaskModalComponent:', this.taskModal);
  }

  navigateTo(view: string): void {
    if (view !== '/home') {
      this.router.navigate([`/${view}`]).then(() => {
        this.logRecentActivity( view.slice(1), view.slice(1) as 'task' | 'project' | 'dashboard' | 'calendar');
      });
    } else {
      this.router.navigate([`/${view}`]);
    }
    this.currentView = view;
  }

  toggleProjects(): void {
    this.showProjects = !this.showProjects;
  }

  navigateToProject(event: Event, projectId: number): void {
    event.preventDefault();
    this.router.navigate([`/projectTable/${projectId}`]).then(() => {
      this.logRecentActivity(`Project ${projectId}`, 'project');
    });
  }

  navigateToTask(event: Event, taskId: number): void {
    event.preventDefault();
    const project = this.projects.find(p => p.tasks.some(t => t.id === taskId));
    if (project) {
      const task = project.tasks.find(t => t.id === taskId);
      if (task) {
        this.taskModal.task = task;
        this.taskModal.tasks = project.tasks;
        this.taskModal.openModal();
      } else {
        console.error('Task not found');
      }
    } else {
      console.error('Project not found');
    }
  }

  openAddNewProjectModal(event: Event): void {
    event.preventDefault();
    const modalElement = document.getElementById('newProjectModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  openOptionsModal(event: Event, projectId: number): void {
    event.preventDefault();
    this.optionsModal.openModal(projectId);
  }

  onProjectAdded(project: Project): void {
    this.projects.push(project);
  }

  deleteProject(projectId: number): void {
    this.projects = this.projects.filter(project => project.id !== projectId);
  }

  addNewTask(event: { projectId: number, task: Task }): void {
    this.newTaskModal.projectId=event.projectId;
    this.projectService.addTaskToProject(event.projectId, event.task);
  }

  onAddNewTask(projectId: number): void {
    this.newTaskModal.projectId = projectId;
    console.log("projectid: "+this.newTaskModal.projectId);
    const modalElement = document.getElementById('newTaskModal');
    this.newTaskModal.projectId = projectId;
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  private logRecentActivity(name: string, type: 'task' | 'project' | 'dashboard' | 'calendar'): void {
    this.recentsService.addRecent(name, type).subscribe(() => {
      console.log('Recent activity logged:', name, type);
    });
  }
}
