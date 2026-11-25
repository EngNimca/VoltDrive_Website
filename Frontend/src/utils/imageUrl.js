// "/uploads/cars/a.jpg" -> "http://localhost:5000/uploads/cars/a.jpg"
export const imageUrl = (path) => (path ? import.meta.env.VITE_SERVER_URL + path : '')