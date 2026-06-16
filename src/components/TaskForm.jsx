import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTasks } from '../hooks/useTasks'
import { toast } from 'react-toastify'

const schema = z.object({
  title: z.string().min(1, '标题不能为空').max(100, '标题不能超过100个字符'),
})

export default function TaskForm() {
  const { addTask } = useTasks()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    const result = schema.safeParse(data)
    if (!result.success) return
    await addTask(data.title.trim())
    toast.success('任务创建成功')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="task-form">
      <input
        {...register('title', { required: '标题不能为空', maxLength: { value: 100, message: '标题不能超过100个字符' } })}
        placeholder="输入新任务..."
        autoComplete="off"
      />
      <button type="submit">添加</button>
      {errors.title && <span className="error">{errors.title.message}</span>}
    </form>
  )
}
