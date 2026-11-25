// import { createContext, useContext, useState } from 'react'
// import api from '../services/api'

// const AuthContext = createContext()

// // Soo qaado user-ka la keydiyay (haddii uu hore u soo galay)
// const savedUser = () => {
//   try {
//     return JSON.parse(localStorage.getItem('user'))
//   } catch {
//     return null
//   }
// }

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(savedUser)

//   // Keydi token iyo user (login iyo register labadaba)
//   const save = (data) => {
//     localStorage.setItem('token', data.token)
//     localStorage.setItem('user', JSON.stringify(data.user))
//     setUser(data.user)
//   }

//   const login = async (email, password) => {
//     const { data } = await api.post('/auth/login', { email, password })
//     save(data)
//     return data.user
//   }

//   const register = async (name, email, password) => {
//     const { data } = await api.post('/auth/register', { name, email, password })
//     save(data)
//     return data.user
//   }

//   const logout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//     setUser(null)
//   }

//   return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
// }

// export const useAuth = () => useContext(AuthContext)


import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext()

// Soo qaado user-ka la keydiyay (haddii uu hore u soo galay)
const savedUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(savedUser)

  // Keydi user-ka (state + localStorage)
  const updateUser = (data) => {
    localStorage.setItem('user', JSON.stringify(data))
    setUser(data)
  }

  // Keydi token iyo user (login iyo register labadaba)
  const save = (data) => {
    localStorage.setItem('token', data.token)
    updateUser(data.user)
  }

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    save(data)
    return data.user
  }

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password })
    save(data)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)