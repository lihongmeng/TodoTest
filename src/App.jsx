import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TaskProvider } from './context/TaskContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TasksPage from './pages/TasksPage'
import './styles/app.css'

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<TasksPage />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={2000} />
      </TaskProvider>
    </BrowserRouter>
  )
}
