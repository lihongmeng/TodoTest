import { v4 as uuidv4 } from 'uuid'

export const mockTasks = [
  {
    id: uuidv4(),
    title: '完成 React CRUD 项目',
    completed: false,
    createdAt: new Date('2025-06-10').toISOString(),
  },
  {
    id: uuidv4(),
    title: '学习 Context API 状态管理',
    completed: true,
    createdAt: new Date('2025-06-08').toISOString(),
  },
  {
    id: uuidv4(),
    title: '配置 Vite 开发环境',
    completed: true,
    createdAt: new Date('2025-06-05').toISOString(),
  },
]
