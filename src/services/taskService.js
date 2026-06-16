import { mockTasks } from '../data/mockTasks'
import { v4 as uuidv4 } from 'uuid'

let tasks = [...mockTasks]

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

export async function getTasks() {
  await delay()
  return [...tasks]
}

export async function createTask(title) {
  await delay()
  const task = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  }
  tasks = [task, ...tasks]
  return task
}

export async function updateTask(id, updates) {
  await delay()
  tasks = tasks.map(t => (t.id === id ? { ...t, ...updates } : t))
  return tasks.find(t => t.id === id)
}

export async function deleteTask(id) {
  await delay()
  tasks = tasks.filter(t => t.id !== id)
}
