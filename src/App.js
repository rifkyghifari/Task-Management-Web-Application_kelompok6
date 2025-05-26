import React, { useState, useEffect, useRef } from 'react';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>TaskEasy - Task Management</h1>
        <p>Simple task management for agile teams</p>
      </header>

      <main className="main">
        <section className="form-section">
          <TaskForm onSubmit={addTask} />
        </section>

        <section className="tasks-section">
          {/* Placeholder kosong atau teks "List tugas akan tampil di sini" */}
          <p>List tugas akan tampil di Day 3</p>
        </section>
      </main>
    </div>
  );
}

export default App;
