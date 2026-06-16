export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="搜索任务..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}
