export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'ON_HOLD';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt?: string;
  updatedAt?: string;
  tasks?: Task[];
}

export interface ProjectsResponse {
  projects: Project[];
  totalPages: number;
  currentPage: number;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  assignedTo?: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
  project?: Project;
  assignedUser?: User;
}

export interface TasksResponse {
  tasks: Task[];
  totalPages: number;
}

export interface CreateProjectDto {
  name: string;
  description: string;
  status: ProjectStatus;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  status?: ProjectStatus;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  projectId: string;
  priority: TaskPriority;
  dueDate?: string;
  assignedTo?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  assignedTo?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
}