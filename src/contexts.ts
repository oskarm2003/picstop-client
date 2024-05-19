import { createContext } from "react"

export const loginViewSetterContext = createContext<React.Dispatch<React.SetStateAction<'login' | 'login no-animation' | 'register' | 'password change'>> | null>(null)
export const loginViewContext = createContext<'login' | 'login no-animation' | 'register' | 'password change' | null>(null)
export const loginContainer = createContext<React.RefObject<HTMLDivElement> | null>(null)
export const setMouseFollowerColorContext = createContext<React.Dispatch<React.SetStateAction<string | undefined>> | null>(null)
export const photoDataContext = createContext<{ author_name: string, photo_name: string } | null>(null)
export const commentContentContext = createContext<string>("")
export const setCommentContentContext = createContext<React.Dispatch<React.SetStateAction<string>> | null>(null)