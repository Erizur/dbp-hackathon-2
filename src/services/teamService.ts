import api from './api';
import type { TeamMember, Task } from '../types';

export const teamService = {
  async getTeamMembers(): Promise<{ members: TeamMember[] }> {
    const response = await api.get('/team/members');
    return response.data;
  },

  async getMemberTasks(memberId: string): Promise<{ tasks: Task[] }> {
    const response = await api.get(`/team/members/${memberId}/tasks`);
    return response.data;
  },
};