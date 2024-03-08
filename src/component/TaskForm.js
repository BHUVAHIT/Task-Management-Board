import React, { useState,useEffect } from 'react';

const TaskForm = ({action}) => {
  const {handleTaskCreate,taskData,setTaskData,editTaskId,columnData,handleUpdateData}=action;
  const [validationError,setValidationError]=useState({})




  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
    setValidationError((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));

  };

  const validateForm = () => {
    const isErrors = {};

    if (!taskData.title.trim()) {
      isErrors.title = 'Title is required';
    }

    if (!taskData.description.trim()) {
      isErrors.description = 'Description is required';
    }

    if (!taskData.dueDate) {
      isErrors.dueDate = 'Due Date is required';
    }

    setValidationError(isErrors);

    return Object.keys(isErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
        const formattedDate = new Date(taskData.dueDate).toLocaleDateString('en-GB');
        const updatedTaskData = { ...taskData, dueDate: formattedDate };

       if (editTaskId !== null) {
        handleUpdateData(updatedTaskData)
      } else {
        handleTaskCreate(updatedTaskData);
      }
      setTaskData({ title: '', description: '', dueDate: '' });
      setValidationError({});
    }
  };
console.log("1111111-taskData.dueDate",taskData.dueDate)
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '3em' }}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
        />
        {validationError.title && (
          <p style={{ color: 'red' }}>{validationError.title}</p>
        )}
      </div>

      <div style={{ marginBottom: '3em' }}>
        <label>Description:</label>
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
        />
        {validationError.description && (
          <p style={{ color: 'red' }}>{validationError.description}</p>
        )}
      </div>

      <div style={{ marginBottom: '3em' }}>
        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate ? new Date(taskData.dueDate).toLocaleDateString('en-CA') : ''}
          onChange={handleChange}
          placeholder={taskData.dueDate ? new Date(taskData.dueDate).toLocaleDateString('en-GB') : ''}

        />
        {validationError.dueDate && (
          <p style={{ color: 'red' }}>{validationError.dueDate}</p>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;
