import styles from './TodoItem.module.css'

function TodoItem({ task, onDelete, onStatusChange }) {
  return (
    <li className={styles.item}>
      <span className={`${styles.text} ${task.status === 'done' ? styles.completed : ''}`}>
        {task.text}
      </span>

      <div className={styles.buttons}>
        {task.status === 'inProgress' && (
          <button onClick={() => onStatusChange(task.id, 'todo')}>
            ←
          </button>
        )}

        {task.status === 'done' && (
          <button onClick={() => onStatusChange(task.id, 'inProgress')}>
            ←
          </button>
        )}

        {task.status === 'todo' && (
          <button onClick={() => onStatusChange(task.id, 'inProgress')}>
            →
          </button>
        )}

        {task.status === 'inProgress' && (
          <button onClick={() => onStatusChange(task.id, 'done')}>
            →
          </button>
        )}

        <button className={styles.deleteBtn} onClick={() => onDelete(task.id)}>
          Usuń
        </button>
      </div>
    </li>
  )
}

export default TodoItem