import TodoItem from './TodoItem'
import './TodoList.css'

function TodoList({ todos, onEdit, onDelete, onToggle }) {
  return (
    <div className="todo-list-container">
      {todos.length > 0 ? (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default TodoList
