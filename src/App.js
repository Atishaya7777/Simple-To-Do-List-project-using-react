import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import { useState, useEffect } from "react";
import Header from "./Component/Header";
import Tasks from "./Component/Tasks";
import AddTask from "./Component/AddTask";
import Footer from "./Component/Footer";
import About from "./Component/About";
import "./App.css";

function App() {
   const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // get tasks
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks()
  }, [])

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data
  }

   // fetch task. With a single s
   const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data
  }

  // Add task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method:'POST', headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();

    setTasks([...tasks, data])
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  } 

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  
  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type':'application/json'
      },
    body: JSON.stringify(updTask)
  })

  const data = await res.json();

    setTasks(
      tasks.map((task) =>
      task.id === id? {...task, reminder: data.reminder}: task)
    )
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
          {/* Note: You can also use && as an alternative to the tenary operator where the && will just check if the value is true and then do the corresponding. Kinda like the if statement */}
          
          <Route path="/" exact render={(props) => (
            <>
            {showAddTask && <AddTask onAdd={addTask}/>} 
            {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>):("No tasks to show")}
            </>
          )} />
          <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
    
    
  );
}

export default App;
