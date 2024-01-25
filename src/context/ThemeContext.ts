import { local } from '@/utils/storage'
import { createContext } from 'react'

export default createContext<
  ['light' | 'dark', React.Dispatch<React.SetStateAction<'light' | 'dark'>>]
>([local.getTheme(), () => {}]);