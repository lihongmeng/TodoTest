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
    <li className="flex items-center gap-3 p-3.5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        className="w-4.5 h-4.5 text-blue-500 rounded border-gray-300 focus:ring-blue-400 cursor-pointer"
      />
      {editing ? (
        <input
          className="flex-1 px-2 py-1 border border-blue-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => { setEditTitle(task.title); setEditing(false) }}
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 text-sm cursor-pointer ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
          onDoubleClick={() => setEditing(true)}
        >
          {task.title}
        </span>
      )}
      <span className="text-xs text-gray-400 hidden sm:inline">
        {format(new Date(task.createdAt), 'yyyy-MM-dd')}
      </span>
      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="px-2.5 py-1 text-xs text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 active:bg-blue-200 transition-colors"
          >
            编辑
          </button>
        )}
        <button
          onClick={handleDelete}
          className="px-2.5 py-1 text-xs text-red-600 bg-red-50 rounded-md hover:bg-red-100 active:bg-red-200 transition-colors"
        >
          删除
        </button>
      </div>
    </li>
  )
}
