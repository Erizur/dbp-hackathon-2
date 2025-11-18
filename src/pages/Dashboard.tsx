import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { taskService } from '../services/taskService';
import { projectService } from '../services/projectService';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { DashboardStats } from '../types';

export const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [allTasks, completedTasks, todoTasks, inProgressTasks] = await Promise.all([
        taskService.getTasks({ limit: 1000 }),
        taskService.getTasks({ status: 'COMPLETED', limit: 1000 }),
        taskService.getTasks({ status: 'TODO', limit: 1000 }),
        taskService.getTasks({ status: 'IN_PROGRESS', limit: 1000 }),
      ]);

      const now = new Date();
      const overdue = allTasks.tasks.filter(
        task => task.dueDate && new Date(task.dueDate) < now && task.status !== 'COMPLETED'
      ).length;

      setStats({
        totalTasks: allTasks.tasks.length,
        completedTasks: completedTasks.tasks.length,
        pendingTasks: todoTasks.tasks.length + inProgressTasks.tasks.length,
        overdueTasks: overdue,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ title, value, color, icon }: any) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`text-4xl ${color}`}>{icon}</div>
      </div>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Tareas"
          value={stats.totalTasks}
          color="text-blue-600"
          icon="📋"
        />
        <StatCard
          title="Completadas"
          value={stats.completedTasks}
          color="text-green-600"
          icon="✅"
        />
        <StatCard
          title="Pendientes"
          value={stats.pendingTasks}
          color="text-yellow-600"
          icon="⏳"
        />
        <StatCard
          title="Vencidas"
          value={stats.overdueTasks}
          color="text-red-600"
          icon="⚠️"
        />
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/tasks?action=create">
            <Button>➕ Crear Nueva Tarea</Button>
          </Link>
          <Link to="/projects?action=create">
            <Button variant="secondary">📁 Crear Nuevo Proyecto</Button>
          </Link>
          <Link to="/tasks">
            <Button variant="secondary">👀 Ver Todas las Tareas</Button>
          </Link>
          <Link to="/projects">
            <Button variant="secondary">📊 Ver Todos los Proyectos</Button>
          </Link>
        </div>
      </Card>

      {/* Activity Feed */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
        <div className="text-gray-600">
          <p className="text-sm">Las actualizaciones en tiempo real aparecerán aquí...</p>
        </div>
      </Card>
    </div>
  );
};