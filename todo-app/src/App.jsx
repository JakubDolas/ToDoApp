import { useState, useEffect } from 'react'
  
import TodoItem from './TodoItem'


function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('all')

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

  const filteredTodos = todos.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed

    return true
  })

  const activeTodosCount = todos.filter((task) => !task.completed).length

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <button onClick={() => setFilter('all')}>Wszystkie</button>
        <button onClick={() => setFilter('active')}>Aktywne</button>
        <button onClick={() => setFilter('completed')}>Ukończone</button>
      </div>

      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Wpisz zadanie...'
      />
      <button onClick={handleAdd}>Dodaj</button>
      <p>{activeTodosCount} zadań do zrobienia</p>

      <ul>
        {filteredTodos.map((task) => (
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