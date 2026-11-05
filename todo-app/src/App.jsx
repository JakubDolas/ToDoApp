import { useState, useEffect } from 'react'

import Column from './Column'
import styles from './App.module.css'


function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    console.log("Odczytano z localStorage przy starcie:", saved)
    return saved ? JSON.parse(saved) : []
  })

  const [inputValue, setInputValue] = useState('')
  const [draggedTaskId, setDraggedTaskId] = useState(null)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleAdd = () => {
    if (inputValue.trim() === '') return
    setTodos([...todos, {id: Date.now(), text: inputValue, status: 'todo'}])
    setInputValue('')
  }

  const handleDelete = (id) => {
    setTodos(todos.filter((task) => task.id !== id))
  }

  const handleStatusChange = (id, newStatus) => {
    setTodos(todos.map((task) =>
      task.id === id ? {...task, status: newStatus} : task
    ))
  }

  const todoTasks = todos.filter((task) => task.status === 'todo')
  const inProgressTasks = todos.filter((task) => task.status === 'inProgress')
  const doneTasks = todos.filter((task) => task.status === 'done')

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tablica <span>zadań</span></h1>
        <div className={styles.inputGroup}>  
          <input className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Wpisz nowe zadanie...'
          />
          <button className={styles.addButton} onClick={handleAdd}>Dodaj</button>
        </div>

      <p className={styles.counter}>{todoTasks.length} zadań do zrobienia</p>

      <div className={styles.board}>
        <Column
          title="Do zrobienia"
          status="todo"
          tasks={todoTasks}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          setDraggedTaskId={setDraggedTaskId}
          draggedTaskId={draggedTaskId}
        />
        <Column
          title="W trakcie"
          status="inProgress"
          tasks={inProgressTasks}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          setDraggedTaskId={setDraggedTaskId}
          draggedTaskId={draggedTaskId}
        />
        <Column
          title="Zrobione"
          status="done"
          tasks={doneTasks}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          setDraggedTaskId={setDraggedTaskId}
          draggedTaskId={draggedTaskId}
        />
      </div>
    </div>
  )
}

export default App