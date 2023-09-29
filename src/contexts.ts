import { createContext } from "react"

export const loginViewSetterContext = createContext<React.Dispatch<React.SetStateAction<'login' | 'login no-animation' | 'register' | 'password change'>> | null>(null)
export const loginViewContext = createContext<'login' | 'login no-animation' | 'register' | 'password change' | null>(null)
export const loginContainer = createContext<React.RefObject<HTMLDivElement> | null>(null)
export const setMouseFollowerColorContext = createContext<React.Dispatch<React.SetStateAction<string | undefined>> | null>(null)