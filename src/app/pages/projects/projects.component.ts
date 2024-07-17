
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from './project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [
    {
      name: 'Project 1',
      addedBy: 'User100',
      tasks: [
        { name: 'Task 1' },
        { name: 'Task 2' },
        { name: 'Task 3' }
      ]
    },
    {
      name: 'Project 2',
      addedBy: 'User100',
      tasks: [
        { name: 'Task 1' },
        { name: 'Task 2' },
        { name: 'Task 3' }
      ]
    }
  ];
  newProjectName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToProject(project: Project): void {
    this.router.navigate(['/project'], { state: { project } });
  }

  addProject(): void {
    if (this.newProjectName.trim()) {
      const newProject: Project = {
        name: this.newProjectName,
        addedBy: 'User100', // This should be dynamically set to the logged-in user
        tasks: []
      };
      this.projects.push(newProject);
      this.newProjectName = '';
    }
  }
}
