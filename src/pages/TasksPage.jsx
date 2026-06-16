import { useEffect, useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import SearchBar from '../components/SearchBar'

export default function TasksPage() {
  const { tasks, loading, error, fetchTasks } = useTasks()
  const [search, setSearch] = useState('')

  useEffect(() => { fetchTasks() }, [fetchTasks])

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <p className="text-center py-10 text-gray-500">Loading...</p>
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Todo App</h1>
      <TaskForm />
      <SearchBar value={search} onChange={setSearch} />
      {tasks.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No tasks yet. Add one above.</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No tasks match your search.</p>
      ) : (
        <TaskList tasks={filtered} />
      )}
    </div>
  )
}
