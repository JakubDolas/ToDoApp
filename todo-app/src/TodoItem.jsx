function TodoItem({task, onDelete, onToggle}) {
    return (
        <li key={task.id}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />
            {task.text}
            <button onClick={() => onDelete(task.id)}>Usuń</button>
        </li>
    )
}

export default TodoItem