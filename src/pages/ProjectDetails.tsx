import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { Project, TaskStatus, TaskPriority } from '../types';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) loadProject();
  }, [id]);

  const loadProject = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const data = await projectService.getProjectById(id);
      setProject(data);
    } catch (error) {
      console.error('Error loading project:', error);
      navigate('/projects');
    } finally {
      setIsLoading(false);
    }
  };

  const statusColors: Record<TaskStatus, string> = {
    TODO: 'bg-gray-100 text-gray-800',
    IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
    COMPLETED: 'bg-green-100 text-green-800',
  };

  const priorityColors: Record<TaskPriority, string> = {
    LOW: 'bg-blue-100 text-blue-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-orange-100 text-orange-800',
    URGENT: 'bg-red-100 text-red-800',
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => navigate('/projects')}>
          ← Volver
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Información del Proyecto</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Descripción:</span> {project.description}</p>
          <p><span className="font-medium">Estado:</span> {project.status}</p>
          <p><span className="font-medium">Creado:</span> {new Date(project.createdAt || '').toLocaleDateString()}</p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tareas del Proyecto</h2>
          <Button onClick={() => navigate(`/tasks?projectId=${project.id}&action=create`)}>
            ➕ Agregar Tarea
          </Button>
        </div>

        {!project.tasks || project.tasks.length === 0 ? (
          <p className="text-gray-600">No hay tareas en este proyecto aún.</p>
        ) : (
          <div className="space-y-3">
            {project.tasks.map((task) => (
              <div
                key={task.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[task.status]}`}>
                      {task.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                {task.dueDate && (
                  <p className="text-sm text-gray-500 mt-2">
                    Vence: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};