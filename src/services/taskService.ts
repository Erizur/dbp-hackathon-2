import api from './api';
import { Task, TasksResponse, CreateTaskDto, UpdateTaskDto, TaskStatus } from '../types';

interface GetTasksParams {
  projectId?: string;
  status?: TaskStatus;
  priority?: string;
  assignedTo?: string;
  page?: number;
  limit?: number;
}

export const taskService = {
  async getTasks(params: GetTasksParams = {}): Promise<TasksResponse> {
    console.log('🔍 [getTasks] Params originales:', params);
    
    // Convertir los parámetros según la API spec
    // project_id, status, priority, assignedTo (camelCase!), page, limit
    const apiParams: any = {};
    if (params.projectId) apiParams.project_id = parseInt(params.projectId);
    if (params.status) apiParams.status = params.status;
    if (params.priority) apiParams.priority = params.priority;
    if (params.assignedTo) apiParams.assignedTo = parseInt(params.assignedTo); // La API usa camelCase aquí!
    if (params.page) apiParams.page = params.page;
    if (params.limit) apiParams.limit = params.limit;
    
    console.log('🔍 [getTasks] Params para API:', apiParams);
    
    try {
      const response = await api.get('/tasks', { params: apiParams });
      console.log('✅ [getTasks] Response exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [getTasks] Error:', error.response?.data || error.message);
      throw error;
    }
  },

  async getTaskById(id: string): Promise<Task> {
    console.log('🔍 [getTaskById] ID:', id);
    
    try {
      const response = await api.get(`/tasks/${id}`);
      console.log('✅ [getTaskById] Response exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [getTaskById] Error:', error.response?.data || error.message);
      throw error;
    }
  },

  async createTask(data: CreateTaskDto): Promise<Task> {
    console.log('🔍 [createTask] Data original:', data);
    
    // Según la API spec, los campos del body son:
    // title, description, project_id, priority, due_date, assigned_to
    const backendData: any = {
      title: data.title,
      project_id: parseInt(data.projectId), // Convertir a int
      priority: data.priority,
    };
    
    if (data.description) backendData.description = data.description;
    if (data.dueDate) backendData.due_date = data.dueDate;
    if (data.assignedTo) backendData.assigned_to = parseInt(data.assignedTo); // Convertir a int
    
    console.log('🔍 [createTask] Data convertida:', backendData);
    
    try {
      const response = await api.post('/tasks', backendData);
      console.log('✅ [createTask] Response exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [createTask] Error:', error.response?.data || error.message);
      throw error;
    }
  },

  async updateTask(id: string, data: UpdateTaskDto): Promise<Task> {
    console.log('🔍 [updateTask] ID:', id, 'Data original:', data);
    
    // Según la API spec: title, description, status, priority, due_date, assigned_to
    const backendData: any = {};
    
    if (data.title !== undefined) backendData.title = data.title;
    if (data.description !== undefined) backendData.description = data.description;
    if (data.status !== undefined) backendData.status = data.status;
    if (data.priority !== undefined) backendData.priority = data.priority;
    if (data.dueDate !== undefined) backendData.due_date = data.dueDate;
    if (data.assignedTo !== undefined) backendData.assigned_to = data.assignedTo ? parseInt(data.assignedTo) : null;
    
    console.log('🔍 [updateTask] Data convertida:', backendData);
    
    try {
      const response = await api.put(`/tasks/${id}`, backendData);
      console.log('✅ [updateTask] Response exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [updateTask] Error:', error.response?.data || error.message);
      throw error;
    }
  },

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    console.log('🔍 [updateTaskStatus] ID:', id, 'Status:', status);
    
    try {
      const response = await api.patch(`/tasks/${id}/status`, { status });
      console.log('✅ [updateTaskStatus] Response exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [updateTaskStatus] Error:', error.response?.data || error.message);
      throw error;
    }
  },

  async deleteTask(id: string): Promise<{ message: string }> {
    console.log('🔍 [deleteTask] ID:', id);
    
    try {
      const response = await api.delete(`/tasks/${id}`);
      console.log('✅ [deleteTask] Response exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [deleteTask] Error:', error.response?.data || error.message);
      throw error;
    }
  },
};