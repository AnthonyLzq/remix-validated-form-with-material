import { createMakeStyles } from 'tss-react'
import { createTheme } from '@mui/material'

const { makeStyles } = createMakeStyles({
  useTheme: () => createTheme({})
})

export { makeStyles }
