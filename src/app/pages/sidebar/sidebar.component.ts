import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  projectsExpanded = false;
  projects = [
    { id: 1, name: 'Project 1', expanded: false, tasks: [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }] },
    { id: 2, name: 'Project 2', expanded: false, tasks: [{ id: 3, name: 'Task 1' }] },
    { id: 3, name: 'Project 3', expanded: false, tasks: [] }
  ];

  toggleProjects() {
    this.projectsExpanded = !this.projectsExpanded;
  }

  toggleProjectTasks(projectId: number) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      project.expanded = !project.expanded;
    }
  }
}
