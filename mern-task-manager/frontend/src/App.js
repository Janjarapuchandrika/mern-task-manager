
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!form.title || !form.description || !form.dueDate) return;
    await axios.post(API_URL, form);
    setForm({ title: '', description: '', dueDate: '' });
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await axios.put(`${API_URL}/${task._id}`, {
      ...task,
      completed: !task.completed
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="card">
        <input
          type="text"
          placeholder="Task Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Task Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>
        <button onClick={() => setFilter('Pending')}>Pending</button>
      </div>

      {filteredTasks.map(task => (
        <div className="card" key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>

          <button onClick={() => toggleComplete(task)}>
            Toggle Status
          </button>

          <button onClick={() => deleteTask(task._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
