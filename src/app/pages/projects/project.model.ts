// src/app/projects/project.model.ts
export interface Task {
  name: string;
}

export interface Project {
  name: string;
  addedBy: string;
  tasks: Task[];
}
