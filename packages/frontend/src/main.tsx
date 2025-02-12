import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ description: '' });

  const API_URL = import.meta.env.VITE_API_URL;
  // "https://ltgm06ka1l.execute-api.us-east-2.amazonaws.com/stage"

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        // mode: 'no-cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      const createdTask = await response.json();
      setTasks([...tasks, createdTask]);
      setNewTask({ description: '' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div class="container-fluid" >
      <h1 class="text-center">Task Manager</h1>

      <div class="container">

        <div class="row">

          <div class="col">
            
            <div class="card">
              <div class="card-header">
                Tasks
              </div>
              <ul class="list-group list-group-flush">
                {tasks.map((task) => (
                  <li class="list-group-item" key={task.id}>{task.description}</li>
                ))}
              </ul>
            </div>
          </div>

          <div class="col">
            <form onSubmit={createTask}>

              <div class="mb-3">
                <label for="description" class="form-label">Task description</label>
                <textarea
                  type="text"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  // placeholder="Task description"
                  class="form-control"
                  id="description"
                  rows="3"
                ></textarea>
              </div>

              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" class="btn btn-primary">Add Task</button>
              </div>

            </form>
          </div>


        </div>

      </div>
      
    </div>
  );
};

// export default TaskManager;
ReactDOM.render(<App />, document.getElementById("root"));
