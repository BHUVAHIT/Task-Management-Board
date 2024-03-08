import React,{useRef} from 'react';

const Task = ({ task, onDelete, onEdit, columnNames, setColumnData ,onDragStart}) => {
  const taskRef = useRef(null);

  const handleStatusChange = (newStatus) => {
    setColumnData((prevTasks) => {
      const updatedTasks = prevTasks.map((el) => {
        if (el.id === task?.id) {
          return { ...el, status: newStatus };
        }
        return el;
      });
      localStorage.setItem('taskData', JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  };



  const handleDragStart = (e) => {
    onDragStart(e, task.id);
    if (taskRef.current) {
      taskRef.current.style.backgroundColor = 'lightblue';
      taskRef.current.style.opacity = 0.7;
    }
  };

  const handleDragEnd = () => {
    if (taskRef.current) {
      taskRef.current.style.backgroundColor = '';
      taskRef.current.style.opacity = '';
    }
  };



  return (
    <div
    draggable
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
    className="task-card"
    ref={taskRef}

  >
    <div style={{ border: '2px solid black', padding: '10px', marginBottom: '10px' }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <label>Status:</label>
      <select value={task.status} onChange={(e) => handleStatusChange(e.target.value)}>
        {columnNames?.map((columnName) => (
          <option key={columnName} value={columnName}>
            {columnName}
          </option>
        ))}
      </select>
      <button onClick={() => onDelete(task.id)}>Delete</button>
      <button onClick={() => onEdit(task.id)}>Edit</button>
    </div>
    </div>
  );
};

export default Task;
