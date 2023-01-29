import type { FC } from 'react'

import { Box } from '@mui/material'

import { MainContactTypography } from '~/global'
import { useCardStyles } from '../styles'

type TitleProps = {
  title: string
  socialMedia?: boolean
}

const Title: FC<TitleProps> = props => {
  const { title } = props
  const { classes: cardClasses } = useCardStyles({})

  return (
    <Box className={cardClasses.cardBodyTitle}>
      <MainContactTypography>{title}</MainContactTypography>
    </Box>
  )
}

export { Title }
