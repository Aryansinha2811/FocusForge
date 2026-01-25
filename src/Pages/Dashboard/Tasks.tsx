import { useState } from 'react';
import { Plus, Filter, Trash2, Edit, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    completed: boolean;
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filterType, setFilterType] = useState<string>('all');
    const [filterPriority, setFilterPriority] = useState<string>('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium' as 'low' | 'medium' | 'high',
        dueDate: ''
    });

    const handleAddTask = () => {
        if (!newTask.title.trim()) return;

        const task: Task = {
            id: Date.now().toString(),
            title: newTask.title,
            description: newTask.description,
            priority: newTask.priority,
            dueDate: newTask.dueDate,
            completed: false
        };

        setTasks([...tasks, task]);
        setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
        setShowAddModal(false);
    };

    const toggleTaskComplete = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const filteredTasks = tasks.filter(task => {
        if (filterType === 'completed' && !task.completed) return false;
        if (filterType === 'active' && task.completed) return false;
        if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
        return true;
    });

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-300';
            case 'medium': return 'bg-yellow-300';
            case 'low': return 'bg-green-300';
            default: return 'bg-gray-300';
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-5xl font-hero font-bold mb-2">Tasks</h1>
                    <p className="text-gray-600 font-paragraph text-lg">
                        Manage your tasks and to-dos
                    </p>
                </div>
                <Button
                    onClick={() => setShowAddModal(true)}
                    variant="default"
                    size="default"
                    className='font-button'
                >
                    <Plus size={20} />
                    Add Task
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-white border-4 border-black rounded-base shadow-base p-6 mb-6">
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <Filter size={20} />
                        <span className="font-heading font-bold">Filters:</span>
                    </div>

                    {/* Task Type Filter */}
                    <div className="flex items-center gap-2">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="bg-gray-100 border-4 border-black rounded-base px-4 py-2 font-base font-bold cursor-pointer hover:translate-x-1 hover:translate-y-1 transition-all"
                        >
                            <option value="all">All Tasks</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                        </select>

                        {/* Priority Filter */}
                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="bg-gray-100 border-4 border-black rounded-base px-4 py-2 font-base font-bold cursor-pointer hover:translate-x-1 hover:translate-y-1 transition-all"
                        >
                            <option value="all">All Priorities</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    <div className="ml-auto font-base text-gray-600">
                        {filteredTasks.length} tasks
                    </div>
                </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                    <div className="bg-white border-4 border-black rounded-base shadow-base p-12 text-center">
                        <p className="text-gray-500 font-paragraph text-lg">
                            No tasks found. Create your first task to get started!
                        </p>
                    </div>
                ) : (
                    filteredTasks.map(task => (
                        <div
                            key={task.id}
                            className={`bg-white border-4 border-black rounded-base shadow-base p-6 hover:translate-x-1 hover:translate-y-1 transition-all ${task.completed ? 'opacity-60' : ''
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                {/* Checkbox */}
                                <button
                                    onClick={() => toggleTaskComplete(task.id)}
                                    className="mt-1 hover:scale-110 transition-transform"
                                >
                                    {task.completed ? (
                                        <CheckCircle2 size={28} className="text-green-600" />
                                    ) : (
                                        <Circle size={28} className="text-gray-400" />
                                    )}
                                </button>

                                {/* Task Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3
                                            className={`text-xl font-heading font-bold ${task.completed ? 'line-through text-gray-500' : ''
                                                }`}
                                        >
                                            {task.title}
                                        </h3>
                                        <span
                                            className={`${getPriorityColor(
                                                task.priority
                                            )} border-2 border-black rounded-base px-3 py-1 text-xs font-bold uppercase`}
                                        >
                                            {task.priority}
                                        </span>
                                    </div>

                                    {task.description && (
                                        <p className="text-gray-700 font-paragraph mb-2">
                                            {task.description}
                                        </p>
                                    )}

                                    {task.dueDate && (
                                        <p className="text-sm text-gray-500 font-base">
                                            Due: {new Date(task.dueDate).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button
                                        variant="default"
                                        size="icon"
                                        className="bg-blue-300"
                                        title="Edit task"
                                    >
                                        <Edit size={18} />
                                    </Button>
                                    <Button
                                        onClick={() => deleteTask(task.id)}
                                        variant="default"
                                        size="icon"
                                        className="bg-red-300"
                                        title="Delete task"
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Task Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white border-4 border-black rounded-base shadow-dark max-w-md w-full p-6">
                        <h2 className="text-3xl font-hero font-bold mb-6">Add New Task</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block font-heading font-bold mb-2">
                                    Task Title *
                                </label>
                                <input
                                    type="text"
                                    value={newTask.title}
                                    onChange={(e) =>
                                        setNewTask({ ...newTask, title: e.target.value })
                                    }
                                    className="w-full border-4 border-black rounded-base px-4 py-2 font-base focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all"
                                    placeholder="Enter task title"
                                />
                            </div>

                            <div>
                                <label className="block font-heading font-bold mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={newTask.description}
                                    onChange={(e) =>
                                        setNewTask({ ...newTask, description: e.target.value })
                                    }
                                    className="w-full border-4 border-black rounded-base px-4 py-2 font-base focus:outline-none focus:translate-x-1 focus:translate-y-1 transition-all resize-none"
                                    rows={3}
                                    placeholder="Enter task description"
                                />
                            </div>

                            <div>
                                <label className="block font-heading font-bold mb-2">
                                    Priority
                                </label>
                                <select
                                    value={newTask.priority}
                                    onChange={(e) =>
                                        setNewTask({
                                            ...newTask,
                                            priority: e.target.value as 'low' | 'medium' | 'high'
                                        })
                                    }
                                    className="w-full border-4 border-black rounded-base px-4 py-2 font-base cursor-pointer"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-heading font-bold mb-2">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    value={newTask.dueDate}
                                    onChange={(e) =>
                                        setNewTask({ ...newTask, dueDate: e.target.value })
                                    }
                                    className="w-full border-4 border-black rounded-base px-4 py-2 font-base"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <Button
                                onClick={handleAddTask}
                                variant="default"
                                size="lg"
                                className="flex-1 bg-green-300 font-button"
                            >
                                Add Task
                            </Button>
                            <Button
                                onClick={() => setShowAddModal(false)}
                                variant="neutral"
                                size="lg"
                                className="flex-1 font-button"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 