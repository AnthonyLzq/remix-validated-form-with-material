import { createContext } from 'react'

export interface StyleContextData {
  key: string
  ids: Array<string>
  css: string
}

const StylesContext = createContext<null | StyleContextData[]>(null)

export { StylesContext }
