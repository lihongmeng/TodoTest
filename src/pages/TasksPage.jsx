import { useEffect, useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import { toast } from 'react-toastify'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import SearchBar from '../components/SearchBar'

export default function TasksPage() {
  const { tasks, loading, error, fetchTasks, clearCompleted } = useTasks()
  const [search, setSearch] = useState('')

  useEffect(() => { fetchTasks() }, [fetchTasks])

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  )

  const completedCount = tasks.filter(t => t.completed).length

  const handleClearCompleted = async () => {
    await clearCompleted()
    toast.success('已清除所有已完成任务')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Todo App</h1>
          <span className="text-xs text-gray-400">{tasks.length} 项任务</span>
        </div>

        <TaskForm />
        <SearchBar value={search} onChange={setSearch} />

        {completedCount > 0 && (
          <button
            onClick={handleClearCompleted}
            className="mb-4 text-xs text-gray-500 hover:text-red-500 transition-colors"
          >
            清除已完成 ({completedCount})
          </button>
        )}

        {tasks.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5h6" />
            </svg>
            <p className="text-sm">No tasks yet. Add one above.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm">No tasks match your search.</p>
          </div>
        ) : (
          <TaskList tasks={filtered} />
        )}
      </div>
    </div>
  )
}
