// Xarafka hore ee magaca (sida Gmail): "Admin" -> A
export default function Avatar({ user, size = 40 }) {
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.45 }}
      className="grid shrink-0 place-items-center rounded-full bg-primary font-semibold uppercase text-white"
    >
      {user?.name?.charAt(0)}
    </span>
  )
}