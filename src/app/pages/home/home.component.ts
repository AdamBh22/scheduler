import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { RecentsService } from '../../services/recents.service';
import { Task } from '../../models/task.model';
import { Recent } from '../../models/recents.model';
import { Router } from '@angular/router';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('taskModal') taskModal!: TaskModalComponent;

  user=new User(1,'','','','',[],[]);
  today = new Date();
  recents: Recent[] = [];
  agenda: Task[] = [];
  workItems = {
    today: [] as Task[],
    next: [] as Task[],
    late: [] as Task[],
    unplanned: [] as Task[]
  };
  attributedItems: Task[] = [];
  isWorkListVisible: {
    today: boolean,
    next: boolean,
    late: boolean,
    unplanned: boolean
  } = {
    today: false,
    next: false,
    late: false,
    unplanned: false
  };

  constructor(
    protected userService: UserService,
    protected taskService: TaskService,
    protected recentsService: RecentsService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserById(1).subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error fetching user', error);
      },
      complete: () => {
        this.loadTasks();
        this.loadRecents();
      }
    });
  }

  loadTasks(): void {
    this.taskService.getUserTasks(this.user.id).subscribe(tasks => {
      this.attributedItems = tasks;
    });

    this.taskService.getTasksByStatus('In Progress').subscribe(tasks => {
      this.workItems.today = tasks;
    });

    this.taskService.getTasksByStatus('Next').subscribe(tasks => {
      this.workItems.next = tasks;
    });

    this.taskService.getTasksByStatus('Late').subscribe(tasks => {
      this.workItems.late = tasks;
    });

    this.taskService.getTasksByStatus('Unplanned').subscribe(tasks => {
      this.workItems.unplanned = tasks;
    });

    this.taskService.getTasksForToday(this.user.id).subscribe(tasks => {
      this.agenda = tasks;
    });
  }

  loadRecents(): void {
    this.recentsService.getRecents().subscribe(recents => {
      this.recents = recents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  toggleWorkList(list: 'today' | 'next' | 'late' | 'unplanned') {
    this.isWorkListVisible[list] = !this.isWorkListVisible[list];
  }

  openTaskModal(task: Task): void {
    this.taskModal.task = task;
    this.taskModal.tasks = [task];
    this.taskModal.openModal();
  }

  navigateToTask(taskId: number): void {
    this.taskService.getTaskById(taskId).subscribe((task: Task) => {
      this.openTaskModal(task);
    });
  }

  navigateToProject(projectId: number): void {
    this.router.navigate([`/projectTable/${projectId}`]);
    this.logRecentActivity(`Project ${projectId}`, 'project');
  }

  navigateToRecent(recent: Recent): void {
    console.log(recent.type);
    switch (recent.type) {
      case 'task':
        const taskId = parseInt(recent.type.split(' ')[1], 10);
        this.navigateToTask(taskId);
        break;
      case 'project':
        this.navigateToProject(parseInt(recent.type.split(' ')[1], 10));
        break;
      case 'dashboard':
        this.navigateTo('dashboard');
        this.logRecentActivity(`dashboard`, 'dashboard');
        break;
      case 'calendar':
        this.navigateTo('calendar');
        this.logRecentActivity(`calendar`, 'calendar');
        break;
    }
  }
  navigateTo(view: string): void {
    this.router.navigate([`/${view}`]);
    console.log("worked function!");
  }
  private logRecentActivity(name: string, type: 'task' | 'project' | 'dashboard' | 'calendar'): void {
    let recent = new Recent(new Date(), type, this.user);
    this.recentsService.addRecent(recent).subscribe(() => {
      this.loadRecents();
    });
  }
}
