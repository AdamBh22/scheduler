import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Task } from '../../../models/task.model';
import { Dependency } from '../../../models/dependency.model';
import { Comment } from '../../../models/comment.model';
import { Activity } from '../../../models/activity.model';
import { Modal } from 'bootstrap';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import {Project} from "../../../models/project.model";
import {ProjectService} from "../../../services/project.service";
import {TaskService} from "../../../services/task.service";

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss']
})
export class NewTaskModalComponent implements OnInit {
  @Output() taskAdded = new EventEmitter<{ projectId: number, task: Task }>();
  @Input() projectId!: number;
  project =new Project("",[],[]);

  newTaskName: string = '';
  status: string = 'To Do';
  priority: string = 'Medium';
  appUserId: number = 0;
  starting: Date = new Date();
  ending: Date = new Date();
  description: string = '';
  dependencies: Dependency[] = [];
  comments: Comment[] = [];
  activities: Activity[] = [];
  users: User[] = [];

  constructor(private userService: UserService,private projectService: ProjectService,protected taskService: TaskService) {}

  ngOnInit(): void {
    this.loadProject();
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsersByProject(this.projectId).subscribe((users) => {
      if (users) {
        this.users = users;
      } else {
        console.error('no users found');
      }
    });
  }


  addNewTask() {
    if (this.newTaskName.trim() && this.projectId) {
      const newTask = new Task(
      );
      newTask.name=this.newTaskName;
      newTask.userId=this.appUserId;
      newTask.project=this.project;
      newTask.starting=this.starting;
      newTask.ending=this.ending;
      newTask.status=this.status;
      newTask.dependencies = this.dependencies;
      newTask.comments = this.comments;
      newTask.activities = this.activities;
      newTask.priority=this.priority;
      newTask.description=this.description;
     // this.taskService.addTask(newTask);
      this.taskAdded.emit({ projectId: this.projectId, task: newTask });
      this.newTaskName = '';
      this.closeModal();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('newTaskModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  private loadProject() {
    this.projectService.getProjectById(this.projectId).subscribe((project) => {
      if (project) {
        this.project = project;
      } else {
        console.error('Project not found');
      }
    });
  }
}
