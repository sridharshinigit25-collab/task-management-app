import React, { useState } from "react";
import TaskForm from "./component/TaskForm";
import TaskTable from "./component/TaskTable";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);

  const reloadTasks = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="App">
      <h2 className="app-title">Task Management App</h2>
      <TaskForm onTaskAdded={reloadTasks} />
      <TaskTable refresh={refresh} />
    </div>
  );
}

export default App;
