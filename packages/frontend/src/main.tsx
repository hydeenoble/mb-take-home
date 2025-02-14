import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", `${import.meta.env.VITE_API_URL}/tasks`],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

const App = () => {
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ description: '' });

  const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

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
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
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
      <br />


      <div class="container">

        <div class="row">

          <div class="col-md-6 col-sm-12 col-xs-12">
            <form onSubmit={createTask}>

              <div class="mb-3">
                <textarea
                  type="text"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Task description"
                  class="form-control"
                  id="description"
                  rows="3"
                ></textarea>
              </div>

              <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
                <button type="submit" class="btn btn-primary">Add Task</button>
              </div>

            </form>
          </div>

          <div class="col-md-6 col-sm-12 col-xs-12">
            
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

        </div>

      </div>
      
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
