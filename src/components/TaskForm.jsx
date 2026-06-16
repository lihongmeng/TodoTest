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
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-4 flex-wrap">
      <input
        {...register('title', { required: '标题不能为空', maxLength: { value: 100, message: '标题不能超过100个字符' } })}
        placeholder="输入新任务..."
        autoComplete="off"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
        添加
      </button>
      {errors.title && <span className="w-full text-red-500 text-xs mt-1">{errors.title.message}</span>}
    </form>
  )
}
