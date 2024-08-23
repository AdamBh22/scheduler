import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {catchError, map, Observable, of, Subscription} from 'rxjs';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import {AppUserProjectService} from "../../services/app-user-project.service";
import {AppUserProject} from "../../models/AppUserProject.model";

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit, OnDestroy {
  project!: Project;
  tasks: Task[] = [];
  users: User[] = [];
  selectedUserId: number=1;
  private routeSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService,
    protected appUserProjectService: AppUserProjectService,
  ) {}

  ngOnInit(): void {
    this.routeSub.add(
      this.route.paramMap.subscribe(params => {
        const projectId = +params.get('id')!;
        this.loadProject(projectId);
        this.loadUsers(projectId);
      })
    );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  loadProject(projectId: number): void {
    this.projectService.getProjectById(projectId).subscribe(project => {
      if (project) {
        this.project = project;
        this.tasks = project.tasks;
      } else {
        console.error('Project not found');
      }
    });
  }

  loadUsers(projectId:number): void {
    this.userService.getUsersByProject(projectId).subscribe(users => {
      this.users = users;
    })
  }

  addUserToProject(): void {
    const user = this.userService.getUserById(this.selectedUserId).subscribe(user =>{
      if (user) {
        const appUserProject = new AppUserProject(user, this.project);
        this.appUserProjectService.addAppUserProject(appUserProject);
      }
    });
    this.ngOnInit();
  }

  navigateToGantt(): void {
    this.router.navigate([`/projectGantt/${this.project.id}`]);
  }

  getUserNameById(id: number): Observable<string> {
    return this.userService.getUserById(id).pipe(
      map(user => user.fullName),
      catchError(() => of('Unknown User'))
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'To Do':
        return 'status-to-do';
      case 'In Progress':
        return 'status-in-progress';
      case 'Complete':
        return 'status-complete';
      default:
        return '';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  }

  getPriorityIconClass(priority: string): string {
    switch (priority) {
      case 'High':
        return 'fa-exclamation-circle';
      case 'Medium':
        return 'fa-exclamation-triangle';
      case 'Low':
        return 'fa-exclamation';
      default:
        return '';
    }
  }

}
