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

@Component({
  selector: 'app-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.scss']
})
export class NewTaskModalComponent implements OnInit {
  @Output() taskAdded = new EventEmitter<{ projectId: number, task: Task }>();
  @Input() appUserId!: number;
  project =new Project(1,"",[],[]);

  newTaskName: string = '';
  status: string = 'To Do';
  priority: string = 'Medium';
  projectId: number = 0;
  starting: Date = new Date();
  ending: Date = new Date();
  description: string = '';
  dependencies: Dependency[] = [];
  comments: Comment[] = [];
  activities: Activity[] = [];
  users: User[] = [];  // To store the list of users

  constructor(private userService: UserService,private projectService: ProjectService,) {}

  ngOnInit(): void {
    console.log("found project id:"+this.project.id);
    this.loadUsers();
  }

  loadUsers(): void {
    this.projectService.getProjectById(this.project.id).subscribe((project) => {
      if (project) {
        this.project = project;
        this.users = this.project.users;
      } else {
        console.error('Project not found');
      }
    });
  }


  addNewTask() {
    if (this.newTaskName.trim() && this.appUserId) {
      const newTask = new Task(
        Date.now(),
        this.newTaskName.trim(),
        this.status,
        this.priority,
        this.starting,
        this.ending,
        this.dependencies = [],
        this.description,
        this.comments,
        this.activities,
        this.appUserId
      );
      this.projectService.addTaskToProject(this.project.id, newTask);
      this.taskAdded.emit({ projectId: this.appUserId, task: newTask });
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
}
