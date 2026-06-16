import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTasks } from '../hooks/useTasks'
import { toast } from 'react-toastify'

const schema = z.object({
  title: z.string().min(1, '标题不能为空').max(100, '标题不能超过100个字符'),
})

export default function TaskForm() {
  const { addTask } = useTasks()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: '' },
  })

  const onSubmit = async (data) => {
    await addTask(data.title.trim())
    toast.success('任务创建成功')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-4 flex-wrap">
      <input
        {...register('title')}
        placeholder="输入新任务..."
        autoComplete="off"
        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm bg-white shadow-sm"
      />
      <button
        type="submit"
        className="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
      >
        添加
      </button>
      {errors.title && <span className="w-full text-red-500 text-xs mt-1">{errors.title.message}</span>}
    </form>
  )
}
