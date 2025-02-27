import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/tasks")
      .then(response => {
        console.log("Gelen veri:", response.data);
        setTasks(response.data);
      })
      .catch(error => console.error("Hata:", error));
  }, []);

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8080/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.description} 
            </li>
          ))}
        </ul>
      ) : (
        <p>Henüz bir görev yok!</p>
      )}
    </div>
  );
};

export default TaskList;


