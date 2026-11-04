import styles from './TodoItem.module.css'

function TodoItem({task, onDelete, onToggle}) {
    return (
        <li className={styles.item}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />
            <span className={task.completed ? styles.completed : ''}>
                {task.text}
            </span>
            
            <button onClick={() => onDelete(task.id)}>Usuń</button>
        </li>
    )
}

export default TodoItem