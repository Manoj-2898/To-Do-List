import { useState } from 'react'
import './TodoInput.css'

function TodoInput({ onAdd }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation: Check if input is empty or only whitespace
    if (!input.trim()) {
      setError('Task cannot be empty!')
      return
    }

    // Clear error and add todo
    setError('')
    onAdd(input.trim())
    setInput('')
  }

  // Clear error when user starts typing
  const handleChange = (e) => {
    setInput(e.target.value)
    if (error) {
      setError('')
    }
  }

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Add a new task..."
          className={`todo-input ${error ? 'error' : ''}`}
          autoFocus
        />
        <button type="submit" className="add-btn">
          Add
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}

export default TodoInput
