import React from 'react';

function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <div style={{ fontSize: '14px', color: '#999', marginBottom: '15px' }}>
        Created: {formatDate(task.created_at)}
      </div>
      <div className="task-actions">
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onToggleComplete(task.id, e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Complete
        </label>
        <div>
          <button 
            className="btn" 
            onClick={() => onEdit(task)}
            style={{ marginRight: '10px' }}
          >
            Edit
          </button>
          <button 
            className="btn btn-danger" 
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;