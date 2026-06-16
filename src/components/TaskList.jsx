import TaskItem from './TaskItem'

export default function TaskList({ tasks }) {
  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}
