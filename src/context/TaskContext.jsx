import { createContext, useState, useCallback } from 'react'
import * as taskService from '../services/taskService'

export const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await taskService.getTasks()
      setTasks(data)
    } catch (e) {
      setError(e.message || '获取任务失败')
    } finally {
      setLoading(false)
    }
  }, [])

  const addTask = useCallback(async (title) => {
    const task = await taskService.createTask(title)
    setTasks(prev => [task, ...prev])
    return task
  }, [])

  const updateTask = useCallback(async (id, updates) => {
    const updated = await taskService.updateTask(id, updates)
    setTasks(prev => prev.map(t => (t.id === id ? updated : t)))
    return updated
  }, [])

  const removeTask = useCallback(async (id) => {
    await taskService.deleteTask(id)
    setTasks(prev => prev.filter(t => t.id !== id))
  }, [])

  const clearCompleted = useCallback(async () => {
    const remaining = await taskService.clearCompleted()
    setTasks(remaining)
  }, [])

  return (
    <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, addTask, updateTask, removeTask, clearCompleted }}>
      {children}
    </TaskContext.Provider>
  )
}
