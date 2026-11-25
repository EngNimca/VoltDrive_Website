// "2026-10-12T08:00:00Z" -> "Oct 12, 2026"
export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })