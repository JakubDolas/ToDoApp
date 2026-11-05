import TodoItem from "./TodoItem"
import styles from "./Column.module.css"

function Column({ title, tasks, onDelete, onStatusChange }) {
  return (
    <div className={styles.column}>
      <h2 className={styles.title}>
        {title}
        <span className={styles.count}>{tasks.length}</span>
      </h2>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </ul>
    </div>
  )
}

export default Column