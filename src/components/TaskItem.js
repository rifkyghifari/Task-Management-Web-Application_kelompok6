import React from 'react';

function TaskItem({ task, onEdit, onDelete }) {
  const getPriorityClass = (priority) => `priority-${priority}`;
  const getStatusClass = (status) => `status-${status}`;

  return (
    <div className={`task-item ${getPriorityClass(task.priority)} ${getStatusClass(task.status)}`}>
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <div className="task-badges">
          <span className={`priority-badge ${task.priority}`}>
            {task.priority.toUpperCase()}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span className="task-status">
          Status: {task.status.replace('-', ' ')}
        </span>
        {task.createdAt && (
          <span className="task-date">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="task-actions">
        <button className="btn btn-edit" onClick={() => onEdit(task)}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
