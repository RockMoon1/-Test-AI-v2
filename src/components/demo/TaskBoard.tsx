import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, Flag, GripVertical, CreditCard as Edit2, Trash2, X, Check } from 'lucide-react';
import { Task } from '../../types';
import { mockTasks } from '../../data/mockData';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'academic' as Task['category'],
    priority: 'medium' as Task['priority'],
    dueDate: '',
  });

  const categories: Array<{ id: Task['status']; title: string; color: string }> = [
    { id: 'todo', title: 'To Do', color: 'from-blue-500 to-cyan-500' },
    { id: 'in-progress', title: 'In Progress', color: 'from-yellow-500 to-orange-500' },
    { id: 'completed', title: 'Completed', color: 'from-green-500 to-emerald-500' },
  ];

  const categoryIcons: Record<Task['category'], string> = {
    academic: '📚',
    personal: '💪',
    spiritual: '🙏',
    hobby: '🎨',
  };

  const priorityColors: Record<Task['priority'], string> = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: Task['status']) => {
    if (draggedTask) {
      setTasks(tasks.map(task =>
        task.id === draggedTask.id ? { ...task, status } : task
      ));
      setDraggedTask(null);
    }
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      status: 'todo',
      priority: newTask.priority,
      dueDate: newTask.dueDate || undefined,
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, task]);
    setShowAddModal(false);
    setNewTask({
      title: '',
      description: '',
      category: 'academic',
      priority: 'medium',
      dueDate: '',
    });
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          status: task.status === 'completed' ? 'todo' : 'completed'
        };
      }
      return task;
    }));
  };

  const updateTaskPriority = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const priorities: Task['priority'][] = ['low', 'medium', 'high'];
        const currentIndex = priorities.indexOf(task.priority);
        const nextIndex = (currentIndex + 1) % priorities.length;
        return { ...task, priority: priorities[nextIndex] };
      }
      return task;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Task Board</h3>
          <p className="text-gray-600">Drag and drop tasks to organize your workflow</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(category.id)}
            className="bg-gray-50 rounded-xl p-4 min-h-[500px]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`}></div>
                <h4 className="font-semibold text-gray-900">{category.title}</h4>
                <span className="text-sm text-gray-500">
                  ({getTasksByStatus(category.id).length})
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {getTasksByStatus(category.id).map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  draggable
                  onDragStart={() => handleDragStart(task)}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-move"
                >
                  <Card className="p-4 hover:shadow-lg transition-shadow group">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start space-x-2 flex-1">
                        <GripVertical className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 mb-1">{task.title}</h5>
                          <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xl">{categoryIcons[task.category]}</span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTaskCompletion(task.id);
                            }}
                            className="p-1 hover:bg-green-100 rounded"
                            title="Toggle complete"
                          >
                            <Check className="w-4 h-4 text-green-600" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTask(task.id);
                            }}
                            className="p-1 hover:bg-red-100 rounded"
                            title="Delete task"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateTaskPriority(task.id);
                          }}
                          className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]} cursor-pointer hover:opacity-80 transition-opacity`}
                          title="Click to change priority"
                        >
                          <Flag className="w-3 h-3 inline mr-1" />
                          {task.priority}
                        </button>
                      </div>
                      {task.dueDate && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Add New Task</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Task Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="e.g., Complete homework assignment"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="Add details about your task..."
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={newTask.category}
                        onChange={(e) => setNewTask({ ...newTask, category: e.target.value as Task['category'] })}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      >
                        <option value="academic">📚 Academic</option>
                        <option value="personal">💪 Personal</option>
                        <option value="spiritual">🙏 Spiritual</option>
                        <option value="hobby">🎨 Hobby</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <Input
                    label="Due Date (Optional)"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />

                  <div className="flex space-x-3 pt-4">
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      fullWidth
                      onClick={addTask}
                      disabled={!newTask.title.trim()}
                    >
                      Add Task
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
