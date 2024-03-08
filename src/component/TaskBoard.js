import React, { useState, useEffect } from "react";
import Column from "./Column";
import TaskForm from "./TaskForm";

const TaskBoard = () => {
  const [taskData, setTaskData] = useState({
    id: Date.now().toString(),
    title: "",
    description: "",
    dueDate: "",
  });
  const [columnData, setColumnData] = useState([]);
  const columnNames = ["To Do List", "In Progress", "Done"];
  const [editTaskId, setEditTaskId] = useState(null); // New state to track the task being edited


  useEffect(() => {
    const storedColumnData = JSON.parse(localStorage.getItem("tododata"));
    if (storedColumnData) {
      setColumnData(storedColumnData);
    }
  }, []);

  const handleTaskCreate = (data) => {
    const updatedTaskData = { ...data, status: "To Do List" };  
    setColumnData((prevColumnData) => {
      const newColumnData = [...prevColumnData, updatedTaskData];
      localStorage.setItem("tododata", JSON.stringify(newColumnData));
      return newColumnData;
    });
  }

  const handleUpdateData = (data) => {
    setColumnData((prevColumnData) => {
      const updatedIndex = prevColumnData.findIndex((task) => task.id === data.id);

      if (updatedIndex !== -1) {
        const newColumnData = [...prevColumnData];
        newColumnData[updatedIndex] = { ...data, dueDate: new Date(data.dueDate).toLocaleDateString('en-GB') };

        localStorage.setItem("tododata", JSON.stringify(newColumnData));
        return newColumnData;
      } else {
        console.error("Task not found for update");
        return prevColumnData;
      }
    });
  };


  const onTaskDelete = (taskId) => {
    setColumnData((prevColumnData) => {
      const updatedColumnData = prevColumnData.filter((task) => task.id !== taskId);
      localStorage.setItem("tododata", JSON.stringify(updatedColumnData));
      return updatedColumnData;
    });
  }
  const onTaskEdit = (id) => {
    setEditTaskId(id);
    const editableData = columnData.find((el) => el.id === id);
    setTaskData(editableData);
  };

  


  const onDragStart = (event, id) => {
    event.dataTransfer.setData("id", id);
  };


  const onDrop = (event, status) => {
    event.preventDefault();

    let id = event.dataTransfer.getData("id");
    let updatedTaskData = columnData.map((task) =>
      task.id === id ? { ...task, status } : task
    );
    localStorage.setItem("tododata", JSON.stringify(updatedTaskData));
    setColumnData(updatedTaskData);
  };



  const action = {
    handleTaskCreate,
    taskData,
    setTaskData,
    columnData,
    onTaskDelete,
    onTaskEdit,
    setColumnData,
    columnNames,
    editTaskId,
    handleUpdateData,
    onDragStart
  };


  return (
    <>
      <TaskForm action={action} />
      <div style={{ display: "flex" }}>
      {
        columnNames?.map((columnName,I)=>{
          return(
            <div key={I}>
            <Column
            action={action}
            key={I}
            title={columnName}
            onDrop={onDrop}
          />
            </div>
          )
        })
      }
      </div>

    </>
  );
};

export default TaskBoard;
