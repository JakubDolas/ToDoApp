import { useState, useEffect } from 'react'
  
import TodoItem from './TodoItem'


function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleAdd = () => {
    if (inputValue.trim() === '') return
    setTodos([...todos, {id: Date.now(), text: inputValue}])
    setInputValue('')
  }

  const handleDelete = (id) => {
    setTodos(todos.filter((task) => task.id !== id))
  }

  const handleToggle = (id) => {
    setTodos(todos.map((task) =>
      task.id === id ? {...task, completed: !task.completed} : task
    ))
  }

  return (
    <div>
      <h1>Todo App</h1>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Wpisz zadanie...'
      />
      <button onClick={handleAdd}>Dodaj</button>
      <p>Liczba zadań: {todos.length}</p>

      <ul>
        {todos.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
        
      </ul>
    </div>
  )
}

export default App