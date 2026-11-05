import TodoItem from "./TodoItem"
import styles from "./Column.module.css"

function Column({ 
    title,
    status, 
    tasks, 
    onDelete, 
    onStatusChange,
    setDraggedTaskId,
    draggedTaskId 
}) {

    const handleDraggedOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = () => {
        if (draggedTaskId) {
            onStatusChange(draggedTaskId, status)
            setDraggedTaskId(null)
        }
    }

    return (
        <div 
            className={styles.column}
            onDragOver={handleDraggedOver}
            onDrop={handleDrop}
        >
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
                    setDraggedTaskId={setDraggedTaskId}
                />
                ))}
            </ul>
        </div>
    )
}

export default Column