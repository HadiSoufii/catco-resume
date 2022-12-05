import { createContext, FC, ReactNode, useContext } from 'react'
import { ILocalStorage } from '../../interfaces'

const AuthContext = createContext<{
  createLocalStorage: (userLocalStorage: ILocalStorage) => void,
  getLocalStorage: (key: string) => ILocalStorage | null,
  removeLocalStorage: (key: string) => void,
} | undefined>(undefined);

const setLocalStorage = (key: string, value: ILocalStorage | undefined) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error({ e })
  }
}

const getLocalStorage = (key: string): ILocalStorage | null => {
  try {
    const value = localStorage.getItem(key)
    return value !== "undefined" && value !== null ? JSON.parse(value) : null
  } catch (e) {
    throw new Error("");
  }
}

const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error({ e })
  }
}

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const createLocalStorage = (userLocalStorage: ILocalStorage) => {
    setLocalStorage('user', userLocalStorage)
  }

  const value = { createLocalStorage, getLocalStorage, removeLocalStorage }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined)
    throw new Error('useAuth must be within AuthProvider!')

  return context
}

export { AuthProvider, useAuth }
