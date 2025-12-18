import { useState, useEffect } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all') // all, completed, pending

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos))
      } catch (error) {
        console.error('Error loading todos from localStorage:', error)
      }
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Add a new todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTodos([newTodo, ...todos])
  }

  // Edit a todo
  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    )
  }

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  // Clear all completed todos
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  // Filter todos based on selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed
    if (filter === 'pending') return !todo.completed
    return true // 'all'
  })

  const completedCount = todos.filter((todo) => todo.completed).length
  const pendingCount = todos.filter((todo) => !todo.completed).length

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📝 My To-Do List</h1>
        <p className="subtitle">Stay organized and productive</p>
      </header>

      <main className="app-main">
        <TodoInput onAdd={addTodo} />

        {/* Filter Buttons */}
        <div className="filter-container">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({pendingCount})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Todo List */}
        <TodoList
          todos={filteredTodos}
          onEdit={editTodo}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
        />

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <div className="clear-container">
            <button className="clear-btn" onClick={clearCompleted}>
              Clear {completedCount} Completed Task{completedCount !== 1 ? 's' : ''}
            </button>
          </div>
        )}

        {/* Empty State */}
        {todos.length === 0 && (
          <div className="empty-state">
            <p>🎉 No tasks yet. Add one to get started!</p>
          </div>
        )}

        {/* Filtered Empty State */}
        {todos.length > 0 && filteredTodos.length === 0 && (
          <div className="empty-state">
            <p>✨ No {filter} tasks found.</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2025 To-Do List App | Stay productive! 🚀</p>
      </footer>
    </div>
  )
}

export default App
