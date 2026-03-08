import React, { useState } from "react";
import { addTask } from "../api/TaskService";

function TaskForm({ onTaskAdded }) {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      taskName,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      status,
      createdAt: createdAt ? new Date(createdAt).toISOString() : null,
      updatedAt: new Date().toISOString()
    };

    try {
      await addTask(newTask);
      onTaskAdded(); // reload table
      resetForm();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const resetForm = () => {
    setTaskName("");
    setPriority("Medium");
    setDueDate("");
    setStatus("Pending");
    setCreatedAt("");
    setUpdatedAt("");
  };

    return (
  <div className="box">
  <h3>Add New Task</h3>
  <form onSubmit={handleSubmit} className="task-form">
    <div className="form-row">
      <div className="form-group">
        <label>Task Name</label>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      <div className="form-group">
        <label>Created At</label>
        <input
          type="date"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Updated At</label>
        <input
          type="date"
          value={updatedAt}
          onChange={(e) => setUpdatedAt(e.target.value)}
        />
      </div>
    </div>

    <button type="submit">Add Task</button>
  </form>
</div>
    );
}

export default TaskForm;
