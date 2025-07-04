import React, { createContext, useContext } from 'react'
import useStorageState from '../hooks/useStorageState'
import getRoleBasedOnToken from '../utils/getRoleBasedOnToken'

interface AuthContextValue {
  token: string | null
  role: string | null
  setToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContextValue>({
  token: null,
  role: null,
  setToken: () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useStorageState<string | null>('jwtToken', null)
  const role = token ? getRoleBasedOnToken(token) : null

  return (
    <AuthContext.Provider value={{ token, role, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
