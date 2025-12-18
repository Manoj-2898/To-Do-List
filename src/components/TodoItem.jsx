import { useState } from 'react'
import './TodoItem.css'

function TodoItem({ todo, onEdit, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [error, setError] = useState('')

  const handleEditChange = (e) => {
    setEditText(e.target.value)
    if (error) {
      setError('')
    }
  }

  const handleSaveEdit = () => {
    if (!editText.trim()) {
      setError('Task cannot be empty!')
      return
    }

    onEdit(todo.id, editText.trim())
    setIsEditing(false)
    setError('')
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
    setError('')
  }

  if (isEditing) {
    return (
      <li className="todo-item editing-mode">
        <div className="edit-wrapper">
          <input
            type="text"
            value={editText}
            onChange={handleEditChange}
            className={`edit-input ${error ? 'error' : ''}`}
            autoFocus
          />
          <div className="edit-buttons">
            <button className="save-btn" onClick={handleSaveEdit}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
      </li>
    )
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
          title="Mark as complete"
        />
        <span className="todo-text">{todo.text}</span>
      </div>

      <div className="todo-actions">
        <button
          className="edit-btn"
          onClick={() => setIsEditing(true)}
          title="Edit task"
        >
          ✎
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(todo.id)}
          title="Delete task"
        >
          ✕
        </button>
      </div>
    </li>
  )
}

export default TodoItem
