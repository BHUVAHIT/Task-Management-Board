import React from 'react';
import Task from './Task';
import TaskForm from './TaskForm';

const Column = ({ action, key, title,onDrop }) => {
  const { columnData, onTaskDelete, onTaskEdit, setColumnData,columnNames ,onDragStart} = action;

const filteredTasks = columnData.filter((task) => task.status === title);

const handleDrop = (e) => {
  onDrop(e, title);
};

const handleDragOver = (e) => {
  e.preventDefault();
};



  return (
    <div
      key={key}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        width: '300px',
      }}
    >
      <h2>{title}</h2>
      {filteredTasks?.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onTaskDelete}
          onEdit={onTaskEdit}
          columnNames={columnNames}
          setColumnData={setColumnData}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );
};

export default Column;
