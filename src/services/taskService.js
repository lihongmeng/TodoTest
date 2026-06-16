import { mockTasks } from '../data/mockTasks'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'crud-app-tasks'

function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try { return JSON.parse(stored) } catch { /* fall through */ }
  }
  return [...mockTasks]
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

let tasks = loadTasks()

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
  saveTasks(tasks)
  return task
}

export async function updateTask(id, updates) {
  await delay()
  tasks = tasks.map(t => (t.id === id ? { ...t, ...updates } : t))
  saveTasks(tasks)
  return tasks.find(t => t.id === id)
}

export async function deleteTask(id) {
  await delay()
  tasks = tasks.filter(t => t.id !== id)
  saveTasks(tasks)
}

export async function clearCompleted() {
  await delay()
  tasks = tasks.filter(t => !t.completed)
  saveTasks(tasks)
  return [...tasks]
}
