import TaskItem from './TaskItem'

export default function TaskList({ tasks }) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}
