import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <h2>Your Tasks</h2>
        <div className="empty-state">
          <p>No tasks yet. Create your first task above!</p>
        </div>
      </div>
    );
  }

  // Group tasks by status
  const groupedTasks = tasks.reduce((groups, task) => {
    const status = task.status;
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(task);
    return groups;
  }, {});

  // Sort by priority: high > medium > low
  const sortByPriority = (tasks) => {
    const order = { high: 0, medium: 1, low: 2 };
    return [...tasks].sort((a, b) => order[a.priority] - order[b.priority]);
  };

  const statusLabels = {
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'done': 'Done'
  };

  return (
    <div className="task-list">
      <h2>Your Tasks ({tasks.length})</h2>
      <div className="task-columns">
        {Object.entries(statusLabels).map(([status, label]) => (
          <div key={status} className="task-column">
            <h3 className={`column-header ${status}`}>
              {label} ({groupedTasks[status]?.length || 0})
            </h3>
            <div className="tasks">
              {sortByPriority(groupedTasks[status] || []).map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
