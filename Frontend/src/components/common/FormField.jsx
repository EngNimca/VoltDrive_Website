// Hal goob foom: cinwaan + input
export default function FormField({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-heading">{label}</span>
      <input className="input" {...props} />
    </label>
  )
}