export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="搜索任务..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
    />
  )
}
