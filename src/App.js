import React, { useState, useEffect, useRef } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const isInitialMount = useRef(true);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage on updates (skip initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add a new task
  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
    

  };

  // Update an existing task
  const updateTask = (taskData) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === editingTask.id
          ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
          : task
      )
    );
    setEditingTask(null);
    alert('Task updated successfully');

  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  // Start editing
  const startEdit = (task) => {
    setEditingTask(task);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTask(null);
  };

  // Sort tasks by priority (high > medium > low)
  const sortedTasks = [...tasks].sort((a, b) => {
    const order = { high: 3, medium: 2, low: 1 };
    return order[b.priority] - order[a.priority];
  });

  return (
    <div className="app">
      <header className="header">
        <h1>TaskEasy - Task Management</h1>
        <p>Simple task management for agile teams</p>
      </header>

      <main className="main">
        <div className="container">
          <section className="form-section">
            <TaskForm
              onSubmit={editingTask ? updateTask : addTask}
              editingTask={editingTask}
              onCancel={cancelEdit}
            />
          </section>

          <section className="tasks-section">
            <TaskList
              tasks={sortedTasks}
              onEdit={startEdit}
              onDelete={deleteTask}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
