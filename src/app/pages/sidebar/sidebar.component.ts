import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  currentView: string = 'home';
  showProjects: boolean = false;
  projects = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
    { id: 3, name: 'Project 3' }
  ];

  constructor(private router: Router) {}

  navigateTo(view: string) {
    this.currentView = view;
    this.router.navigate([view]);
  }

  toggleProjects() {
    this.showProjects = !this.showProjects;
  }

  openAddNewProjectModal(event: MouseEvent) {
    event.stopPropagation();
    const modalElement = document.getElementById('newProjectModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  onProjectAdded(newProject: { id: number, name: string }) {
    this.projects.push(newProject);
  }

  navigateToProject(projectId: number) {
    this.currentView = `project-${projectId}`;
    this.router.navigate([`project/${projectId}`]);
  }
}
