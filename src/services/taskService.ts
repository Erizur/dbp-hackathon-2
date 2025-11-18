import api from './api';
import type { Task, TasksResponse, CreateTaskDto, UpdateTaskDto, TaskStatus } from '../types';

interface GetTasksParams {
  projectId?: string;
  status?: TaskStatus;
  priority?: string;
  page?: number;
  limit?: number;
}

export const taskService = {
  async getTasks(params: GetTasksParams = {}): Promise<TasksResponse> {
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  async getTaskById(id: string): Promise<Task> {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  async createTask(data: CreateTaskDto): Promise<Task> {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  async updateTask(id: string, data: UpdateTaskDto): Promise<Task> {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const response = await api.patch(`/tasks/${id}/status`, { status });
    return response.data;
  },

  async deleteTask(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};