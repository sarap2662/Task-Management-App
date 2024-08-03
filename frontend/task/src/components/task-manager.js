import React, { useState } from "react";
import { Form, Col, Row, Button, InputGroup, Container } from "react-bootstrap";

function Task() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Management</h1>
        <div>
          <input
            type="text"
            value={task}
            onChange={handleInputChange}
            placeholder="Enter a task"
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => handleRemoveTask(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default Task;
