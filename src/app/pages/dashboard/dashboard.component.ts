import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';

interface ProjectStat {
  id: number;
  name: string;
  progress: number;
  deadline: Date;
  tasksCount: number;
  completed: number;
  inProgress: number;
  lateTasks: number;
  unplannedTasks: number;
  nextTasks: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: ProjectStat[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjectStats();
  }

  loadProjectStats(): void {
    this.projectService.getAllProjects().subscribe((projects: Project[]) => {
      this.stats = projects.map(project => {
        const completed = project.tasks.filter(task => task.status === 'Complete').length;
        const inProgress = project.tasks.filter(task => task.status === 'In Progress').length;
        const lateTasks = project.tasks.filter(task => task.status === 'Late').length;
        const unplannedTasks = project.tasks.filter(task => task.status === 'Unplanned').length;
        const nextTasks = project.tasks.filter(task => task.status === 'Next').length;
        const tasksCount = project.tasks.length;
        const progress = tasksCount > 0 ? Math.round((completed / tasksCount) * 100) : 0;

        return {
          id: project.id,
          name: project.name,
          progress: progress,
          deadline: new Date(), // You might want to update this if you have a deadline property
          tasksCount: tasksCount,
          completed: completed,
          inProgress: inProgress,
          lateTasks: lateTasks,
          unplannedTasks: unplannedTasks,
          nextTasks: nextTasks
        };
      });
    });
  }

  navigateToProject(projectId: number): void {
    this.router.navigate([`/projectTable/${projectId}`]);
  }
}
