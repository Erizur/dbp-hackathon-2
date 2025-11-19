export interface User {
  id: number;
  email: string;
  name: string;
  created_at?: string;
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
  id: number; // La API usa integers
  name: string;
  description: string | null;
  status: ProjectStatus;
  owner_id?: number;
  created_at?: string;
  updated_at?: string;
  tasks?: Task[];
}

export interface ProjectsResponse {
  projects: Project[];
  total_pages: number;
  current_page: number;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Task {
  id: number; // La API usa integers
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  project_id: number;
  assigned_to: number | null;
  due_date: string | null;
  created_at?: string;
  updated_at?: string;
  project?: Project;
  assignedUser?: User;
}

export interface TasksResponse {
  tasks: Task[];
  total_pages: number;
  current_page: number;
}

export interface CreateProjectDto {
  name: string;
  description?: string | null;
  status?: ProjectStatus;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string | null;
  status?: ProjectStatus;
}

export interface CreateTaskDto {
  title: string;
  description?: string | null;
  projectId: string; // En el frontend usamos string, lo convertimos en el service
  priority: TaskPriority;
  dueDate?: string;
  assignedTo?: string; // En el frontend usamos string, lo convertimos en el service
}

export interface UpdateTaskDto {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  assignedTo?: string;
}

export interface TeamMember {
  id: number; // La API usa integers
  name: string;
  email: string;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
}