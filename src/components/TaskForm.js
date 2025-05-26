import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo'
  });

  useEffect(() => {
  if (editingTask) {
    setFormData({
      title: editingTask.title,
      description: editingTask.description,
      priority: editingTask.priority,
      status: editingTask.status
    });
  } else {
    // Reset form jika selesai mengedit atau batal
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo'
    });
  }
}, [editingTask]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    onSubmit(formData);

    // Reset form if not editing
    if (!editingTask) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo'
    });
    onCancel();
  };

  return (
    <div className="task-form">
      <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description..."
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>

          {editingTask && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;