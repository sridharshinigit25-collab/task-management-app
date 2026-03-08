import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../api/TaskService";

function TaskTable({ refresh }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, [refresh]);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      console.log("Tasks from backend:", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="box">
      <h3>Task List</h3>
      <table className="task-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.taskName}</td>
              <td>{task.priority}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>
                <span
                  className={`status ${
                    task.status === "Pending"
                      ? "pending"
                      : task.status === "In Progress"
                      ? "progress"
                      : "done"
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td>{new Date(task.createdAt).toLocaleDateString()}</td>
              <td>{task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : ""}</td>
              <td>
                {/* 🔹 Only Delete button */}
                <button className="delete" onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
