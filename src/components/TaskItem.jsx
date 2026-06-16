import { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

export default function TaskItem({ task }) {
  const { updateTask, removeTask } = useTasks()
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)

  const handleToggle = async () => {
    await updateTask(task.id, { completed: !task.completed })
    toast.success('状态已更新')
  }

  const handleDelete = async () => {
    if (!window.confirm('确定要删除这条任务吗？')) return
    await removeTask(task.id)
    toast.success('任务已删除')
  }

  const handleSave = async () => {
    const trimmed = editTitle.trim()
    if (!trimmed || trimmed.length > 100) return
    await updateTask(task.id, { title: trimmed })
    toast.success('任务已更新')
    setEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') { setEditTitle(task.title); setEditing(false) }
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={task.completed} onChange={handleToggle} />
      {editing ? (
        <input
          className="edit-input"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => { setEditTitle(task.title); setEditing(false) }}
          autoFocus
        />
      ) : (
        <span className="task-title" onDoubleClick={() => setEditing(true)}>{task.title}</span>
      )}
      <span className="task-date">{format(new Date(task.createdAt), 'yyyy-MM-dd')}</span>
      {!editing && <button className="btn-edit" onClick={() => setEditing(true)}>编辑</button>}
      <button className="btn-delete" onClick={handleDelete}>删除</button>
    </li>
  )
}
