import React, { useState, useEffect } from 'react';
import taskService from '../services/taskService';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Alert from '../components/Alert';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [success, setSuccess] = useState('');
  
  useEffect(() => {
    fetchTasks();
  }, []);
  
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
      setError('');
    } catch (err) {
      setError(err.detail || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks([...tasks, newTask]);
      setShowForm(false);
      setSuccess('Task created successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.detail || 'Failed to create task');
    }
  };
  
  const handleUpdateTask = async (id, taskData) => {
    try {
      const updatedTask = await taskService.updateTask(id, taskData);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      setEditingTask(null);
      setSuccess('Task updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.detail || 'Failed to update task');
    }
  };
  
  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
        setSuccess('Task deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.detail || 'Failed to delete task');
      }
    }
  };
  
  const handleEditTask = (task) => {
    setEditingTask(task);
  };
  
  const handleToggleComplete = async (id, completed) => {
    try {
      const updatedTask = await taskService.updateTask(id, { completed });
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      setError(err.detail || 'Failed to update task');
    }
  };
  
  return (
    <div>
      <div className="dashboard-header">
        <h1>My Tasks</h1>
        <button 
          className="btn" 
          onClick={() => setShowForm(true)}
        >
          Add New Task
        </button>
      </div>
      
      {error && <Alert message={error} type="danger" />}
      {success && <Alert message={success} type="success" />}
      
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h3>No tasks found</h3>
          <p>Click "Add New Task" to create your first task</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      )}
      
      {showForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowForm(false)}
        />
      )}
      
      {editingTask && (
        <TaskForm
          task={editingTask}
          onSubmit={(taskData) => handleUpdateTask(editingTask.id, taskData)}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;